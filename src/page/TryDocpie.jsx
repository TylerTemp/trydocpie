import React, { Fragment, Component } from 'react';

import {
  observer
} from 'mobx-react';

import tryDocpieStorage from '~/storage/tryDocpieStorage';


@observer
class TryDocpie extends Component {

  render() {

    const {doc, argvnofilestr, help, version, stdopt, attachopt, attachvalue, helpstyle, auto2dashes, name, optionsfirst, appearedonly, namedoptions, submitting, error, result} = tryDocpieStorage;

    return <Fragment>
      <textarea value={doc} name="doc" onChange={({target: {name, value}}) => (tryDocpieStorage.updatePair(name, value))}></textarea>

      <hr />

      <input value={argvnofilestr} name="argvnofilestr" onChange={({target: {name, value}}) => (tryDocpieStorage.updatePair(name, value))} />

      <button onClick={ () => (tryDocpieStorage.submit()) }>Enter</button>

      <hr />
        {(() => {
          if(submitting) {
            return <div>submitting</div>;
          }
          if(error) {
            return <div style={{color: 'red'}}>{error}</div>;
          }
          if(result) {
            return <pre>{result}</pre>;
          }
        })()}
      <hr />

      <div>
        <label htmlFor="args-help">help:</label>
        <input type="checkbox" name="help" id="args-help" checked={ help } onChange={({target: {name, checked}}) => (tryDocpieStorage.updatePair(name, checked))} />
        <label htmlFor="args-help">{help? 'True': 'False'}</label>
      </div>

      <div>
        <label htmlFor="args-version">version:</label>
        <input type="text" placeholder="None" name="version" id="args-version" value={ version || '' } onChange={({target: {name, value}}) => (tryDocpieStorage.updatePair(name, value === ''? null: value))} />
      </div>

      <div>
        <label htmlFor="args-stdopt">stdopt:</label>
        <input type="checkbox" name="stdopt" id="args-stdopt" checked={ stdopt } onChange={({target: {name, checked}}) => (tryDocpieStorage.updatePair(name, checked))} />
        <label htmlFor="args-stdopt">{stdopt? 'True': 'False'}</label>
      </div>

      <div>
        <label htmlFor="args-attachopt">attachopt:</label>
        <input type="checkbox" name="attachopt" id="args-attachopt" checked={ attachopt } onChange={({target: {name, checked}}) => (tryDocpieStorage.updatePair(name, checked))} />
        <label htmlFor="args-attachopt">{attachopt? 'True': 'False'}</label>
      </div>

      <div>
        <label htmlFor="args-attachvalue">attachvalue:</label>
        <input type="checkbox" name="attachvalue" id="args-attachvalue" checked={ attachvalue } onChange={({target: {name, checked}}) => (tryDocpieStorage.updatePair(name, checked))} />
        <label htmlFor="args-attachvalue">{attachvalue? 'True': 'False'}</label>
      </div>

      <div>
        <label htmlFor="args-helpstyle">helpstyle:</label>
        <select type="checkbox" name="helpstyle" id="args-helpstyle" value={ helpstyle } onChange={({target: {name, helpstyle}}) => (tryDocpieStorage.updatePair(name, helpstyle))}>
          <option value="python">python</option>
          <option value="dedent">dedent</option>
          <option value="raw">raw</option>
        </select>
      </div>

      <div>
        <label htmlFor="args-auto2dashes">auto2dashes:</label>
          <input type="checkbox" name="auto2dashes" id="args-auto2dashes" checked={ auto2dashes } onChange={({target: {name, checked}}) => (tryDocpieStorage.updatePair(name, checked))} />
        <label htmlFor="args-auto2dashes">{auto2dashes? 'True': 'False'}</label>
      </div>

      <div>
        <label htmlFor="args-name">name:</label>
        <input type="text" placeholder="None" name="name" id="args-name" value={ name || '' } onChange={({target: {name, value}}) => (tryDocpieStorage.updatePair(name, value === ''? null: value))} />
      </div>

      <div>
        <del>
          <label htmlFor="args-case_sensitive">case_sensitive:</label>
          <input type="checkbox" id="args-case_sensitive" checked readOnly />
          <label htmlFor="args-case_sensitive">True  # deprecated</label>
        </del>
      </div>

      <div>
        <label htmlFor="args-optionsfirst">optionsfirst:</label>
        <input type="checkbox" name="optionsfirst" id="args-optionsfirst" checked={ optionsfirst } onChange={({target: {name, checked}}) => (tryDocpieStorage.updatePair(name, checked))} />
        <label htmlFor="args-optionsfirst">{optionsfirst? 'True': 'False'}</label>
      </div>

      <div>
        <label htmlFor="args-appearedonly">appearedonly:</label>
        <input type="checkbox" name="appearedonly" id="args-appearedonly" checked={ appearedonly } onChange={({target: {name, checked}}) => (tryDocpieStorage.updatePair(name, checked))} />
        <label htmlFor="args-appearedonly">{appearedonly? 'True': 'False'}</label>
      </div>

      <div>
        <label htmlFor="args-namedoptions">namedoptions:</label>
        <input type="checkbox" name="namedoptions" id="args-namedoptions" checked={ namedoptions } onChange={({target: {name, checked}}) => (tryDocpieStorage.updatePair(name, checked))} />
        <label htmlFor="args-namedoptions">{namedoptions? 'True': 'False'}</label>
      </div>

      <div>
          <label htmlFor="args-extra">extra:</label>
          <input type="text" value="# not supported here #" readOnly disabled/>
      </div>

    </Fragment>;
  }
}


export default TryDocpie;
