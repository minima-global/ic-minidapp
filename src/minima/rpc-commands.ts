import { INodeIncentiveDetails } from './../App';
import { IScript } from './types/minima';
const setIncentiveCash = (uid: string) => {
    return new Promise((resolve, reject) => {
        req(`incentivecash uid:${uid}`).then((details: any) => {
            //console.log(uid)
            if (!details.details) {
                reject("Invalid uid, please try to register again.")
            }
            resolve(details);

        }).catch((err) => {

            reject(err);

        });
        // return req(`incentivecash ${typeof uid === 'string' && uid.length > 0 ? `"uid:"${uid}` : ''}`);
    });
}
const getIncentiveCashDetails = (): Promise<INodeIncentiveDetails | string> => {
    return new Promise((resolve, reject) => {
        req(`incentivecash`).then((details: any) => {
            
            if (details.details == null && details.uid.length > 0) {
                reject("Invalid uid, please copy over your incentive id from the website.")
            }

            if (details.details == undefined && details.uid.length == 0) {
                reject("No details available, try to register now.")
            }

            

            resolve(details);

        }).catch((err) => {

            reject(err);

        });
        // return req(`incentivecash ${typeof uid === 'string' && uid.length > 0 ? `"uid:"${uid}` : ''}`);
    });
}
const getIncentiveCashID = () => {
    return new Promise((resolve, reject) => {
        req(`incentivecash`).then((details: any) => {
            if (details.uid && details.uid.length == 0) {
                reject("No uid available, please try to register one.");
            }
            resolve(details.uid)
        }).catch((err) => {
        
            reject(err);

        })
    })
}
/** no cache-ing way */
const getNodeDetailsNoCache = (): Promise<INodeIncentiveDetails> => {
    return new Promise(async (resolve, reject) => {
        getIncentiveCashID().then((uid) => {
            
            const url = `https://incentive.minima.global/api/wallet/${uid}`;
            mdsGET(url).then((result: string) => {
                try {
                    const data = JSON.parse(result);
                    resolve(data);
                } catch (err: any) {
                    reject(err);
                }
            });
        }).catch((err) => {
            console.error(err)
        })
    })
}


const getAddress = () => {
    return new Promise((resolve, reject) => {
        req(`getaddress`).then((dt: any) => {

            resolve({nodeAddress: dt.address, publicKey: dt.publickey});
        
        }).catch((err: any) => {

            reject(err);
        
        })
    })
}

/** is Address mine check */

const isAddressMine = (addr: string) => {

    return new Promise((resolve, reject) => {

        req(`scripts`).then((scripts) => {
            let scriptAddress = undefined;
            scripts.forEach((s: IScript) => {
                if (s.address === addr) {
                    scriptAddress = s.address;
                }
            })

            if (scriptAddress) {
                resolve(scriptAddress);
            }
            
            throw new Error("Address not found, this address doesn't belong to you.");
    
        }).catch((err) => {
            
            reject(err);
    
        })


    })

}

const req = (command: string): Promise<any> => {   
    return new Promise((resolve, reject) => {
        MDS.cmd(command, (resp: any) => {

            if (resp.status && !resp.pending) {

                resolve(resp.response);

            } else if (!resp.status && resp.pending) {

                reject(`You have to accept the pending action: ${command}.`);

            } else if (!resp.status && !resp.pending) {

                reject(`Error: ${resp.message ? resp.message : resp.error ? resp.error : "Something went wrong when calling rpc."}`)

            }
        });
    });
}

const mdsGET = (url: string): Promise<string> => {   
    return new Promise((resolve, reject) => {
        MDS.net.GET(url, (resp: any) => {
            
            if (resp.status && !resp.pending) {

                resolve(resp.response);

            } else if (!resp.status && resp.pending) {

                reject(`You have to accept the pending action: ${url}.`);

            } else if (!resp.status && !resp.pending) {

                reject(`Error: ${resp.message ? resp.message : resp.error ? resp.error : "Something went wrong when calling rpc."}`)

            }
        });
    });
}

export {
    setIncentiveCash,
    getAddress,
    getNodeDetailsNoCache,
    getIncentiveCashDetails,
    getIncentiveCashID,
    isAddressMine
}