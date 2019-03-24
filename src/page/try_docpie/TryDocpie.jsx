import React, { Fragment, Component } from 'react';

import {
  observer
} from 'mobx-react';
import classNames from 'classnames';

import CenterWidthLimit from '~/component/center_width_limit/CenterWidthLimit';
// import DoubleDotsSpinner from '~/component/double_dots_spinner/DoubleDotsSpinner';
import DoubleBouncers from '~/component/double_bouncers/DoubleBouncers';

import tryDocpieStorage from '~/storage/tryDocpieStorage';

import tryDocpieStyle from './try_docpie.css';


@observer
class TryDocpie extends Component {

  render() {

    const {doc, argvnofilestr, help, version, stdopt, attachopt, attachvalue, helpstyle, auto2dashes, name, optionsfirst, appearedonly, namedoptions, submitting, serverError, apiError, result} = tryDocpieStorage;

    return <CenterWidthLimit>
      <div className={tryDocpieStyle.container}>
        <form onSubmit={ (evt) => {evt.preventDefault(); tryDocpieStorage.submit()} }>
          <div className={classNames(tryDocpieStyle.editor, tryDocpieStyle.monospace)}>
            <span className={tryDocpieStyle.comment}>#!/usr/bin/env python</span>
            <br />
            <span className={tryDocpieStyle.comment}># -*- coding: utf-8 -*-</span>
            <br />
            <span className={tryDocpieStyle.comment}># </span>
            <br />
            <span className={tryDocpieStyle.string}>"""</span>
            <textarea className={tryDocpieStyle.doc} name="doc" placeholder="Input your doc string" required onChange={({target: {name, value}}) => (tryDocpieStorage.updatePair(name, value))}></textarea>
            <span className={tryDocpieStyle.string}>"""</span>
            <br />
            <span className={tryDocpieStyle.keyword}>from</span>
            {' '}
            docpie
            {' '}
            <span className={tryDocpieStyle.keyword}>import</span>
            {' '}
            docpie
            <br />
            <br />
            args = docpie(<span className={tryDocpieStyle.magic}>__doc__</span>{
              help || <Fragment>, <span className={tryDocpieStyle.funckey}>help</span>=<span className={tryDocpieStyle.bool}>False</span></Fragment>
            }{
              version === null? null: <Fragment>, <span className={tryDocpieStyle.funckey}>version</span>=<span className={tryDocpieStyle.string}>'{version.replace('\\', '\\\\').replace("'", "\\'")}'</span></Fragment>
            }{
              stdopt || <Fragment>, <span className={tryDocpieStyle.funckey}>stdopt</span>=<span className={tryDocpieStyle.bool}>False</span></Fragment>
            }{
              attachopt || <Fragment>, <span className={tryDocpieStyle.funckey}>attachopt</span>=<span className={tryDocpieStyle.bool}>False</span></Fragment>
            }{
              attachvalue || <Fragment>, <span className={tryDocpieStyle.funckey}>attachvalue</span>=<span className={tryDocpieStyle.bool}>False</span></Fragment>
            }{
              helpstyle === 'python' || <Fragment>, <span className={tryDocpieStyle.funckey}>helpstyle</span>=<span className={tryDocpieStyle.string}>'{helpstyle}'</span></Fragment>
            }{
              auto2dashes || <Fragment>, <span className={tryDocpieStyle.funckey}>auto2dashes</span>=<span className={tryDocpieStyle.bool}>False</span></Fragment>
            }{
              name === null || <Fragment>, <span className={tryDocpieStyle.funckey}>name</span>=<span className={tryDocpieStyle.string}>'{name.replace('\\', '\\\\').replace("'", "\\'")}'</span></Fragment>
            }{
              optionsfirst && <Fragment>, <span className={tryDocpieStyle.funckey}>optionsfirst</span>=<span className={tryDocpieStyle.bool}>True</span></Fragment>
            }{
              appearedonly && <Fragment>, <span className={tryDocpieStyle.funckey}>appearedonly</span>=<span className={tryDocpieStyle.bool}>True</span></Fragment>
            }{
              namedoptions && <Fragment>, <span className={tryDocpieStyle.funckey}>namedoptions</span>=<span className={tryDocpieStyle.bool}>True</span></Fragment>
            })
            <br/>
            <span className={tryDocpieStyle.keyword}>print</span>(args)
          </div>

          <div className={classNames(tryDocpieStyle['terminal-container'], tryDocpieStyle.monospace)}>
            <div className={tryDocpieStyle.terminal}>
              <label className={tryDocpieStyle['exec-prefix']} htmlFor="argvnofilestr">
                <span className={tryDocpieStyle.dollar}>$</span>
                {' '}
                python
                {' '}
                <span>pie.py</span>
                {' '}
              </label>
              <input className={tryDocpieStyle['terminal-input']} type="text" id="argvnofilestr" value={argvnofilestr} name="argvnofilestr" placeholder="# Input your argv" onChange={({target: {name, value}}) => (tryDocpieStorage.updatePair(name, value))} />
              { submitting
                ? <DoubleBouncers/>
                : <button type="submit" className={tryDocpieStyle['terminal-enter']} aria-label="Enter">&#9166;</button>
              }
            </div>
            {/* terminal result */}
            {
              (!submitting)
              && (!serverError)
              && result !== null
              && <div className={classNames({[tryDocpieStyle['api-error']]: apiError, [tryDocpieStyle['api-result']]: true, [tryDocpieStyle['monospace']]: true})}>{result}</div>
            }
          </div>

          {(!submitting)
            && serverError
            && <div className={tryDocpieStyle['server-error-wapper']}>
            <div className={tryDocpieStyle['server-error']}>
              <pre>{serverError}</pre>
            </div>
          </div>}

          <hr />

          <div>
            <div className={tryDocpieStyle['option-row']}>
              <label className={tryDocpieStyle['option-label']} htmlFor="args-help">help:</label>
              <div className={tryDocpieStyle['option-value-container']}>
                <input type="checkbox" name="help" id="args-help" checked={ help } onChange={({target: {name, checked}}) => (tryDocpieStorage.updatePair(name, checked))} />
                <label htmlFor="args-help">{help? 'True': 'False'}</label>
              </div>
            </div>

            <div className={tryDocpieStyle['option-row']}>
              <label className={tryDocpieStyle['option-label']} htmlFor="args-version">version:</label>
              <div className={tryDocpieStyle['option-value-container']}>
                <input type="text" placeholder="None" name="version" id="args-version" value={ version || '' } onChange={({target: {name, value}}) => (tryDocpieStorage.updatePair(name, value === ''? null: value))} />
              </div>
            </div>

            <div className={tryDocpieStyle['option-row']}>
              <label className={tryDocpieStyle['option-label']} htmlFor="args-stdopt">stdopt:</label>
              <div className={tryDocpieStyle['option-value-container']}>
                <input type="checkbox" name="stdopt" id="args-stdopt" checked={ stdopt } onChange={({target: {name, checked}}) => (tryDocpieStorage.updatePair(name, checked))} />
                <label htmlFor="args-stdopt">{stdopt? 'True': 'False'}</label>
              </div>
            </div>

            <div className={tryDocpieStyle['option-row']}>
              <label className={tryDocpieStyle['option-label']} htmlFor="args-attachopt">attachopt:</label>
              <div className={tryDocpieStyle['option-value-container']}>
                <input type="checkbox" name="attachopt" id="args-attachopt" checked={ attachopt } onChange={({target: {name, checked}}) => (tryDocpieStorage.updatePair(name, checked))} />
                <label htmlFor="args-attachopt">{attachopt? 'True': 'False'}</label>
              </div>
            </div>

            <div className={tryDocpieStyle['option-row']}>
              <label className={tryDocpieStyle['option-label']} htmlFor="args-attachvalue">attachvalue:</label>
              <div className={tryDocpieStyle['option-value-container']}>
                <input type="checkbox" name="attachvalue" id="args-attachvalue" checked={ attachvalue } onChange={({target: {name, checked}}) => (tryDocpieStorage.updatePair(name, checked))} />
                <label htmlFor="args-attachvalue">{attachvalue? 'True': 'False'}</label>
              </div>
            </div>

            <div className={tryDocpieStyle['option-row']}>
              <label className={tryDocpieStyle['option-label']} htmlFor="args-helpstyle">helpstyle:</label>
              <div className={tryDocpieStyle['option-value-container']}>
                <select type="checkbox" name="helpstyle" id="args-helpstyle" value={ helpstyle } onChange={({target: {name, value}}) => (tryDocpieStorage.updatePair(name, value))}>
                  <option value="python">python</option>
                  <option value="dedent">dedent</option>
                  <option value="raw">raw</option>
                </select>
              </div>
            </div>

            <div className={tryDocpieStyle['option-row']}>
              <label className={tryDocpieStyle['option-label']} htmlFor="args-auto2dashes">auto2dashes:</label>
              <div className={tryDocpieStyle['option-value-container']}>
                <input type="checkbox" name="auto2dashes" id="args-auto2dashes" checked={ auto2dashes } onChange={({target: {name, checked}}) => (tryDocpieStorage.updatePair(name, checked))} />
                <label htmlFor="args-auto2dashes">{auto2dashes? 'True': 'False'}</label>
              </div>
            </div>

            <div className={tryDocpieStyle['option-row']}>
              <label className={tryDocpieStyle['option-label']} htmlFor="args-name">name:</label>
              <div className={tryDocpieStyle['option-value-container']}>
                <input type="text" placeholder="None" name="name" id="args-name" value={ name || '' } onChange={({target: {name, value}}) => (tryDocpieStorage.updatePair(name, value === ''? null: value))} />
              </div>
            </div>

            <div className={tryDocpieStyle['option-row']}>
              <del>
                <label className={classNames(tryDocpieStyle['option-label'], tryDocpieStyle['option-deleted'])} htmlFor="args-case_sensitive">case_sensitive:</label>
                <div className={tryDocpieStyle['option-value-container']}>
                  <input type="checkbox" id="args-case_sensitive" checked readOnly />
                  <label htmlFor="args-case_sensitive">True  # deprecated</label>
                </div>
              </del>
            </div>

            <div className={tryDocpieStyle['option-row']}>
              <label className={tryDocpieStyle['option-label']} htmlFor="args-optionsfirst">optionsfirst:</label>
              <div className={tryDocpieStyle['option-value-container']}>
                <input type="checkbox" name="optionsfirst" id="args-optionsfirst" checked={ optionsfirst } onChange={({target: {name, checked}}) => (tryDocpieStorage.updatePair(name, checked))} />
                <label htmlFor="args-optionsfirst">{optionsfirst? 'True': 'False'}</label>
              </div>
            </div>

            <div className={tryDocpieStyle['option-row']}>
              <label className={tryDocpieStyle['option-label']} htmlFor="args-appearedonly">appearedonly:</label>
              <div className={tryDocpieStyle['option-value-container']}>
                <input type="checkbox" name="appearedonly" id="args-appearedonly" checked={ appearedonly } onChange={({target: {name, checked}}) => (tryDocpieStorage.updatePair(name, checked))} />
                <label htmlFor="args-appearedonly">{appearedonly? 'True': 'False'}</label>
              </div>
            </div>

            <div className={tryDocpieStyle['option-row']}>
              <label className={tryDocpieStyle['option-label']} htmlFor="args-namedoptions">namedoptions:</label>
              <div className={tryDocpieStyle['option-value-container']}>
                <input type="checkbox" name="namedoptions" id="args-namedoptions" checked={ namedoptions } onChange={({target: {name, checked}}) => (tryDocpieStorage.updatePair(name, checked))} />
                <label htmlFor="args-namedoptions">{namedoptions? 'True': 'False'}</label>
              </div>
            </div>

            <div className={tryDocpieStyle['option-row']}>
              <del>
                <label className={classNames(tryDocpieStyle['option-label'], tryDocpieStyle['option-deleted'])} htmlFor="args-extra">extra:</label>
                <div className={tryDocpieStyle['option-value-container']}>
                  <input type="text" value="# not supported here #" readOnly disabled className={tryDocpieStyle['option-deleted']}/>
                </div>
              </del>
            </div>

          </div>
        </form>
      </div>

    </CenterWidthLimit>;
  }
}


export default TryDocpie;
