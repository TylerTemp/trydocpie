import {
  observable, action, computed, configure, transaction,
} from 'mobx';

import apiCaller from '~/component/apiCaller';

configure({ enforceActions: 'always' });


class TryDocpieStorage {

  @observable doc='Naval Fate.\n\nUsage:\n  naval_fate ship new <name>...\n  naval_fate ship <name> move <x> <y> [--speed=<km/h>]\n  naval_fate ship shoot <x> <y>\n  naval_fate mine (set|remove) <x> <y> [--moored|--drifting]\n  naval_fate -h | --help\n  naval_fate --version\n\nOptions:\n  -h -? --help    Show this screen.\n  --version       Show version.\n  --speed=<km/h>  Speed in knots.[default: 10]\n  --moored        Moored (anchored) mine.\n  --drifting      Drifting mine.';
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
  @observable serverError=null;
  @observable apiError=null;
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
        this.serverError = null;
        this.apiError = null;
        this.result = null;
      });
      apiCaller.post('/api/', JSON.stringify(options), {headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }}).then(action('docpieApiSucceed', (responseBody) => {
          const {ok, result} = JSON.parse(responseBody);
          transaction(() => {
            this.submitting = false;
            this.serverError = null;
            this.apiError = ok;
            this.result = result;
          });
          resolve(result);
        }), action('docpieApiFailed', (error) => {
          const { message } = error;
          transaction(() => {
            this.submitting = false;
            this.serverError = message;
            this.apiError = null;
            this.result = null;
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


const tryDocpieStorage = new TryDocpieStorage();

export default tryDocpieStorage;
