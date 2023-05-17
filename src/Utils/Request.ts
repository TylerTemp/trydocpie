// import { ENDPOINT } from './fetchCommon';

export default (uri: string, config: RequestInit={}): Promise<Response> => (
    new Promise<Response>((resolve, reject) => {
        fetch(`/api${uri}`, config)
            .then(resp => {
                const {status, statusText} = resp;
                if(status < 200 || status >= 300) {
                    let message = `[${status}] ${statusText}`;
                    resp
                        .json()
                        .then(({message: serverMsg}) => {
                            if(serverMsg !== undefined && serverMsg !== null && serverMsg !== '') {
                                message = serverMsg;
                            }
                            const error = new Error(message);
                            reject(error);
                        })
                        .catch(e => {
                            console.log(e);
                            const error = new Error(message);
                            reject(error);
                        });
                } else {
                    resolve(resp);  // let caller decide what to do, may not be json
                }
            })
            .catch(e => reject(e));
    })
);
