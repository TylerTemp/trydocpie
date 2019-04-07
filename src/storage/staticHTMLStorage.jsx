import {
  observable, action, computed, configure, transaction,
} from 'mobx';

import apiCaller from '~/component/apiCaller';

configure({ enforceActions: 'always' });


class StaticHTMLStorage {

  @observable pageSubmitting=false;
  @observable pageError=null;
  pageResults=observable.map({});

  @observable menuSubmitting=false;
  @observable menuError=null;
  @observable menu=null;

  @action getPage(pageRef, dataParser=(data) => (data)) {
    let getType = 'page';
    let url = `/static/${pageRef}`;
    if(pageRef == 'menu') {
      const { menu } = this;
      if(menu !== null) {
        return new Promise(resolve => resolve(menu));
      }
      url = `/static/docpie-wiki/_Sidebar.html`;
      getType = 'menu';
    } else {
      const { [url]: pageResult=null } = this;
      if(pageResult !== null) {
        return new Promise(resolve => resolve(pageResult));
      }
    }

    transaction(() => {
      this[`${getType}submitting`] = true;
      this[`${getType}Error`] = null;
    });

    return new Promise((resolve, reject) => {
      apiCaller.get(url)
        .then(action('staticHTMLSucceed', (responseData) => {
          const result = dataParser(responseData);
          // console.log(`trans ${responseData} -> ${result}`);
          transaction(() => {
            this[`${getType}submitting`] = false;
            this[`${getType}Error`] = null;
            if(getType == 'page') {
              this.pageResults.set(url, result);
            } else {
              this.menu = result;
            }
          });
          resolve(result);
        }), action('staticHTMLFailed', (error) => {
          const { message } = error;
          transaction(() => {
            this[`${getType}submitting`] = false;
            this[`${getType}Error`] = message;
          });
          reject(error);
        }));
    })
  }

}


const staticHTMLStorage = new StaticHTMLStorage();

export default staticHTMLStorage;
