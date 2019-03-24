import axios from 'axios';

class ApiCaller {
  constructor() {
    this.axios = axios.create({
      transformResponse: undefined,
    });
  }

  get(url, config) {
    const baseConfig = { url, method: 'get' };
    const passedConfig = config || {};
    return this.request({ ...baseConfig, ...passedConfig });
  }

  post(url, data, config) {
    const baseConfig = { url, method: 'post', data };
    const passedConfig = config || {};
    return this.request({ ...baseConfig, ...passedConfig });
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.axios.request(config).then((response) => {
        console.log('request finished');
        const { data } = response;
        resolve(data);
      }).catch((error) => {
        console.log('request finished with error', error);
        let errorMsg = 'Unknown error, please try again later';
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const { data } = error.response;
          console.log('response', data);
          let jsonResp = null;
          try {
            jsonResp = JSON.parse(data);
          } catch (e) {
            console.log(error.response);
          }
          if (jsonResp) {
            if (jsonResp.message !== undefined) {
              errorMsg = jsonResp.message;
            } else {
              errorMsg = data;
            }
          } else {
            errorMsg = data;
          }
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error);
          // errorMsg = `未知伺服器錯誤(${error.message})，請稍後再試`;
          errorMsg = `Unknown error (${error.message}), please try again later`;
        }

        reject(new Error(errorMsg));
      });
    });
  }
}


const apiCaller = new ApiCaller();

export default apiCaller;
