import {
  observable, action, computed, configure, transaction,
} from 'mobx';

import apiCaller from '~/component/apiCaller';

configure({ enforceActions: 'always' });


class TryDocpieStorage {

  @observable doc='';
  @observable argvnofilestr='';

  @observable help=true;
  @observable version=null;
  @observable stdopt=true;
  @observable attachopt=true;
  @observable attachvalue=true;
  @observable helpstyle='python';
  @observable auto2dashes=true;
  @observable name=null;
  // @observable caseSensitive=false;
  @observable optionsfirst=false;
  @observable appearedonly=false;
  @observable namedoptions=false;
  // @observable extra=null;

  @observable submitting=false;
  @observable error=null;
  @observable result=null;

  @action updatePair(key, value) {
    // console.log(key, value);
    this[key] = value;
  }

  @action submit() {
    const options = {
      doc: this.doc,
      argvnofilestr: this.argvnofilestr,
      help: this.help,
      version: this.version,
      stdopt: this.stdopt,
      attachopt: this.attachopt,
      attachvalue: this.attachvalue,
      helpstyle: this.helpstyle,
      auto2dashes: this.auto2dashes,
      name: this.name,
      optionsfirst: this.optionsfirst,
      appearedonly: this.appearedonly,
      namedoptions: this.namedoptions,
    };
    return new Promise((resolve, reject) => {
      transaction(() => {
        this.submitting = true;
        this.error = null;
        this.result = null;
      });
      apiCaller.post('/api/', JSON.stringify(options), {headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
      }}).then(action('docpieApiSucceed', (result) => {
          transaction(() => {
            this.submitting = false;
            this.error = null;
            this.result = result
          });
          resolve(result);
        }), action('docpieApiFailed', (error) => {
          const { message } = error;
          transaction(() => {
            this.submitting = false;
            this.error = message;
            this.result = null;
          });
          reject(error);
        }));
    })
  }

}


const tryDocpieStorage = new TryDocpieStorage();

export default tryDocpieStorage;
