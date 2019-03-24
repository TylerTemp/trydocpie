import {
  observable, action, computed, configure, transaction,
} from 'mobx';

import apiCaller from '~/component/apiCaller';

configure({ enforceActions: 'always' });


class DocpieInfoStorage {

  @observable versionTime=null;
  @observable version=null;
  @observable submitting=false;
  @observable error='';

  @computed get versionTimeReadable() {
    const { versionTime } = this;
    if(versionTime === null) {
      return null;
    }
    const date = new Date();
    date.setTime(versionTime * 1000);
    const year = date.getFullYear();
    const monthNum = date.getMonth() + 1;
    const dayNum = date.getDate();
    const hourNum = date.getHours();
    const minNum = date.getMinutes();
    const secNum = date.getSeconds();

    const month = `${monthNum < 10 ? "0" : ""}${monthNum}`;
    const day = `${dayNum < 10 ? "0" : ""}${dayNum}`;
    const hour = `${hourNum < 10 ? "0" : ""}${hourNum}`;
    const min = `${minNum < 10 ? "0" : ""}${minNum}`;
    const sec = `${secNum < 10 ? "0" : ""}${secNum}`;

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
  }

  @action fetch() {
    return new Promise((resolve, reject) => {
      transaction(() => {
        this.versionTime = null;
        this.version = null;
        this.submitting = true;
        this.error = null;
      });
      apiCaller.get('/api/', {headers: {
        'Accept': 'application/json',
      }}).then(action('infoApiSucceed', (responseBody) => {
          const result = JSON.parse(responseBody);
          const {version_time: versionTime, version} = result;
          transaction(() => {
            this.versionTime = versionTime;
            this.version = version;
            this.submitting = false;
            this.error = null;
          });
          resolve(result);
        }), action('infoApiFailed', (error) => {
          const { message } = error;
          transaction(() => {
            this.versionTime = null;
            this.version = null;
            this.submitting = false;
            this.error = message;
          });
          reject(error);
        }));
    })
  }

  @action bulkUpdate(params) {
    transaction(() => {
      Object.keys(params).forEach((key) => {
        const value = params[key];
        this[key] = value;
      });
    });
  }

}


const docpieInfoStorage = new DocpieInfoStorage();

export default docpieInfoStorage;
