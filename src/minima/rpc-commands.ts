const setIncentiveCash = (uid: string | null) => {
    return req(`incentivecash ${uid && uid.length ? `"uid:"${uid}` : null}`);
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