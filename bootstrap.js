const axios = require('axios');
const fs = require('fs');
const https = require('https');
const jsdom = require('jsdom');
const path = require('path');

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

let appName = '';
let tries = 0;
let command = '';
const dirname = __dirname;

function getAppName() {
  const app = fs.readFileSync(__dirname + '/public/dapp.conf', 'utf-8');
  return JSON.parse(app).name;
}

async function checkMinimaHasLoaded(port){
  try {
    const balance = await axios.get(`http://localhost:${port}/balance`);
    const minimaHasLoaded = balance.data.response.find(token => token.tokenid === '0x00' && token.sendable !== '0');
    return minimaHasLoaded;
  } catch {
    return false;
  }
}

async function getMdsPassword(port){
  const balance = await axios.get(`http://localhost:${port}/mds`);
  return balance.data.response.password;
}

async function checkIfAppIsInstalled(port){
  const mds = await axios.get(`http://localhost:${port}/mds`);
  return mds.data.response.minidapps.find(app => app.conf.name === appName);
}

async function removePreviousApps(port){
  const mds = await axios.get(`http://localhost:${port}/mds`);
  const apps = mds.data.response.minidapps.filter(app => app.conf.name === appName);
  for (app of apps) {
    await axios.get(`http://localhost:${port}/mds action:uninstall uid:${app.uid}`);
  }
}

async function getAppUid(port){
  const app = await checkIfAppIsInstalled(port);
  return app ? app.uid : null;
}

async function getMiniDAppPageUrl(port, password, uid) {
  return axios({
    url: `https://localhost:${port}/login.html`,
    method: 'post',
    data: `password=${password}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    httpsAgent,
  }).then(function (response) {
    let sessionId = '';
    let href = '';

    const document = new jsdom.JSDOM(response.data);
    const anchors = document.window.document.querySelectorAll('a');

    anchors.forEach(function(anchor) {
      if (anchor.href.includes(uid)) {
        href = anchor.href;
        sessionId = anchor.href.match(/(?<==).*/)[0];
      }
    });

    return {
      uid,
      href,
      sessionId,
    };
  });
}

async function rpc(port, command) {
  return axios({
    method: 'GET',
    url: `http://localhost:${port}/${command}`,
  }).then((response) => {
    console.log(response.data);
    return response.data;
  });
}

const checkIfMinimaHasLoaded = async (port) => {
  return new Promise((resolve) => {
    const check = () => {
      checkMinimaHasLoaded(port).then(function (hasLoaded) {
        if (tries > 20) {
          clearInterval(interval);
          console.log('Minima checks has timed out');
          process.exit(1);
        }

        if (hasLoaded) {
          console.log('Minima has loaded');
          clearInterval(interval);
          resolve();
        } else {
          console.log('Minima is still loading...');
          tries = tries + 1;
        }
      });
    };

    const interval = setInterval(check, 10000);
    check();
  });
};

const getMostRecentFile = (dir) => {
  const files = orderRecentFiles(dir);
  return files.length ? files[0] : undefined;
};

const orderRecentFiles = (dir) => {
  return fs.readdirSync(dir)
    .filter((file) => file !== '.DS_Store')
    .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
    .map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
};

const bootstrap = async (rpcPort) => {
  const mdsPort = rpcPort - 2;
  const isAppInstalled = false;
  const { file } = getMostRecentFile(__dirname + '/minidapp');
  await removePreviousApps(rpcPort);

  if (!isAppInstalled) {
    if (process.env.CI) {
      command = `mds action:install file:/workspace/minidapp/${file} trust:write`;
    } else {
      command = `mds action:install file:${dirname}/minidapp/${file} trust:write`;
    }

    await rpc(rpcPort, command);
  }

  // split coins, will make tests run faster
  if (rpcPort === 9005) {
    const address = await rpc(rpcPort, 'getaddress');
    await rpc(rpcPort, `send amount:100 address:${address.response.miniaddress} tokenid:0x00 split:4`);
  }

  const appUid = await getAppUid(rpcPort);
  const mdsPassword = await getMdsPassword(rpcPort);
  const app = await getMiniDAppPageUrl(mdsPort, mdsPassword, appUid);

  return {
    rpcUrl: `http://localhost:${rpcPort}`,
    mdsUrl: `https://localhost:${mdsPort}`,
    rpcPort,
    mdsPort,
    miniDAppUid: app.uid,
    miniDAppUrl: app.href.replace('./', `https://localhost:${mdsPort}/`),
  };
};

(async () => {
  appName = getAppName();

  await Promise.all([
    checkIfMinimaHasLoaded(9005),
  ]);

  const response = await Promise.all([
    bootstrap(9005),
  ]);

  const session = {
    MINIDAPP_UID: response[0].miniDAppUid,
    MINIDAPP_APP_URL: response[0].miniDAppUrl,
    MINIMA_RPC_URL: response[0].rpcUrl,
  };

  console.log(session.MINIDAPP_APP_URL);

  fs.writeFileSync('./session.json', JSON.stringify(session, null, 2));

  process.exit();
})();
