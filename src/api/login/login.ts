// Logging into ic endpoint
import {LoginStatus} from "./types"

type status = 'success' | 'error' | 'stale';
interface IWalletUpdateStatus {
  status: status;
  message: string;
}

interface ILoginStatus {
  status: LoginStatus;
  message: string;
}


const login = (email: string, password: string, nodeAddress: string, publicKey: string): Promise<ILoginStatus> => {
  const data = `username=${email}&password=${password}&nodeAddress=${nodeAddress}&publicKey=${publicKey}`;
  // const url = `${process.env.REACT_APP_DOMAIN_NAME}/api/login`;
  const url = `https://incentive.minima.global/api/login`;
 
  // login & try to pass an addr & pub
  return new Promise((resolve, reject) => {
    MDS.net.POST(url, data, (res: any) => {
      // console.log(res)
      let _walletUpdateStatus: IWalletUpdateStatus;
      try {
        _walletUpdateStatus = JSON.parse(res.response);
        //console.log("_walletUpdateStatus",  _walletUpdateStatus);
        if (res.status && !res.pending) {
    
          if (_walletUpdateStatus.status == 'success') {
    
            resolve({status: "UPDATED", message: _walletUpdateStatus.message});
    
          }
    
          // if (_walletUpdateStatus.status == 'stale') {
    
          //   resolve({status:"STALE", message: ""});
    
          // }
    
        
        }
    
        if (!res.status && res.pending) {
    
          reject({status:"PENDING", message: _walletUpdateStatus.message});
    
        }
    
        if (!res.status && !res.pending) {
    
          return reject({status: "FAILED", message:_walletUpdateStatus.message ? _walletUpdateStatus.message : res.error});
    
        }

      } catch (err) {

        reject({status: "FAILED", message: res.error ? res.error : err})
        
      }
    });
  });
}

export {login}