const setIncentiveCash = (uid: string) => {
    return req(`incentivecash ${typeof uid === 'string' && uid.length > 0 ? `"uid:"${uid}` : ''}`);
}

const req = (command: string) => {   
    return new Promise((resolve, reject) => {
        MDS.cmd(command, (resp: any) => {
            if (resp.status) {
                resolve(resp);
            } else {
                reject(resp.message ?  resp.message : 'Minima API Error');
            }
        });
    });
}

export {
    setIncentiveCash, 
}