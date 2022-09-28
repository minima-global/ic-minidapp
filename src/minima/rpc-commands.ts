const setIncentiveCash = (uid: string) => {
    return req(`incentivecash ${typeof uid === 'string' && uid.length > 0 ? `"uid:"${uid}` : ''}`);
}

const getAddress = async () => {
    return req(`getaddress`).then((res: any) => {
        console.log(res);
        if (res.status && !res.pending) {
            return Promise.resolve({nodeAddress: res.response.address, publicKey: res.response.publickey});
        }
        if (!res.status && res.pending) {
            throw new Error(res.error ? res.error : `${res.command} pending command, waiting to be accepted.`);
        }
        if (!res.status && !res.pending) {
            throw new Error(`${res.command} - something went wrong, please try again later.`)
        }
    }).catch((err: any) => {
        return Promise.reject(err);
    })
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
    getAddress
}