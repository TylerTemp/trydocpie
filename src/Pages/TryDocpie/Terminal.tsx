import { createRef, useEffect, useRef, useState } from 'react';
// import Suspendable from '~/Utils/Suspendable';
import Style from './Terminal.css';
import classNames from 'classnames';
import Request from '~/Utils/Request';
import DoubleDotsSpinner from '~/Components/DoubleDotsSpinner';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';


export interface Params {
    doc: string,
    argvnofilestr: string,
    help: boolean,
    version: string | null,
    stdopt: boolean,
    attachopt: boolean,
    attachvalue: boolean,
    helpstyle: 'python' | 'dedent' | 'raw',
    auto2dashes: boolean,
    name: string | null,
    optionsfirst: boolean,
    appearedonly: boolean,
    namedoptions: boolean,
    onSubmitCallback: (curParams: Params) => void,
    // run: boolean,
}

// const getData: () => string = Suspendable(new Promise<string>((resolve) => {
//     setTimeout(() => {
//         console.log("RESOLVED");
//         resolve("Resolved!")
//     }, 2000);
// }));

interface ApiResult {
  status: 'exit' | 'pie',
  output: string | null,
  result: object | null,
}

export default (params: Params) => {
    const [
      curParams,
      setParams
    ] = useState<Params>(params);

    const {
      doc,
      argvnofilestr,
      help,
      version,
      stdopt,
      attachopt,
      attachvalue,
      helpstyle,
      auto2dashes,
      name,
      optionsfirst,
      appearedonly,
      namedoptions,
      onSubmitCallback,
    } = curParams;

    // const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [apiResult, setApiResult] = useState<ApiResult | null>(null);
    const [abortController, setAbortController] = useState<AbortController>(new AbortController());
    useEffect(() => () => abortController.abort(), []);

    const onSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
      evt.preventDefault();
      console.log('Submit:', curParams);

      const newController = new AbortController();
      setAbortController(oldController => {
          oldController.abort();
          return newController;
      });

      setLoading(true);
      setError(null);
      setApiResult(null);

      onSubmitCallback(curParams);

      Request(`/`, {method: 'POST', body: JSON.stringify(curParams), signal: newController.signal})
        .then(resp => resp.json())
        .then((resp: ApiResult): void => setApiResult(resp))
        .catch(err => {
          if(err instanceof DOMException && err.name === 'AbortError') {
            return;
          }
          setError(err);
        })
        .finally(() => setLoading(false));
    };

    // console.log('apiResult', apiResult);

    return <div className={Style.container}>
    <form onSubmit={onSubmit}>
      <div className={classNames(Style.editor, Style.monospace)}>
        <span className={Style.comment}>#!/usr/bin/env python</span>
        <br />
        <span className={Style.comment}># -*- coding: utf-8 -*-</span>
        <br />
        <span className={Style.comment}># {name || `pie.py`}</span>
        <br />
        <span className={Style.string}>"""</span>
        <div className={Style.growWrap} data-replicated-value={doc}>
          <textarea
            className={Style.doc}
            name="doc"
            defaultValue={doc}
            placeholder="Input your doc string"
            required
            onChange={({currentTarget: {value}}: React.FormEvent<HTMLTextAreaElement>) => setParams(old => ({...old, doc: value}))} />
          </div>
        <span className={Style.string}>"""</span>
        <br />
        <span className={Style.keyword}>from</span>
        {' '}
        docpie
        {' '}
        <span className={Style.keyword}>import</span>
        {' '}
        docpie
        <br />
        <br />
        <div className={Style.argsLine!}>
          args = docpie(<span className={Style.magic}>__doc__</span>{
            help || <>, <span className={Style.funckey}>help</span>=<span className={Style.bool}>False</span></>
          }{
            version === null? null: <>, <span className={Style.funckey}>version</span>=<span className={Style.string}>'{version.split('\\').join('\\\\').split("'").join("\\'")}'</span></>
          }{
            stdopt || <>, <span className={Style.funckey}>stdopt</span>=<span className={Style.bool}>False</span></>
          }{
            attachopt || <>, <span className={Style.funckey}>attachopt</span>=<span className={Style.bool}>False</span></>
          }{
            attachvalue || <>, <span className={Style.funckey}>attachvalue</span>=<span className={Style.bool}>False</span></>
          }{
            helpstyle === 'python' || <>, <span className={Style.funckey}>helpstyle</span>=<span className={Style.string}>'{helpstyle}'</span></>
          }{
            auto2dashes || <>, <span className={Style.funckey}>auto2dashes</span>=<span className={Style.bool}>False</span></>
          }{
            name === null || <>, <span className={Style.funckey}>name</span>=<span className={Style.string}>'{name.split('\\').join('\\\\').split("'").join("\\'")}'</span></>
          }{
            optionsfirst && <>, <span className={Style.funckey}>optionsfirst</span>=<span className={Style.bool}>True</span></>
          }{
            appearedonly && <>, <span className={Style.funckey}>appearedonly</span>=<span className={Style.bool}>True</span></>
          }{
            namedoptions && <>, <span className={Style.funckey}>namedoptions</span>=<span className={Style.bool}>True</span></>
          })
        </div>
        <span className={Style.keyword}>print</span>(args)
      </div>

      <div className={classNames(Style.terminalContainer!, Style.monospace!)}>
        <div className={Style.terminal}>
          <label className={Style.execPrefix!} htmlFor="argvnofilestr">
            <span>
              <span className={Style.dollar}>$</span>
              {' '}
              python
              {' '}
              <span>{name || `pie.py`}</span>
              {' '}
            </span>
          </label>
          <input className={Style.terminalInput} type="text" id="argvnofilestr" value={argvnofilestr} name="argvnofilestr" placeholder="# Input your argv" onChange={({currentTarget: {name, value}}: React.ChangeEvent<HTMLInputElement>) => setParams(old => ({...old, [name]: value}))} />
          <button type="submit" className={Style.terminalEnter} aria-label="Enter">&#9166;</button>
        </div>
        {/* terminal loading */}
        {loading && <div className={Style.separatorTexted!}>
          <span className={Style.spearatorContent!}>
            <span>Loading</span> <DoubleDotsSpinner size={20} style={{display: 'inline-block'}}/>
          </span>
        </div>}
        {/* terminal result */}
        {
          apiResult !== null
          && <>
            <div className={Style.separatorTexted!}>
              <span className={Style.spearatorContent!}>{
                apiResult.status === 'pie'? "Result": "DocpieExit"
              }</span>
            </div>
            <div className={classNames({
                [Style.apiError]: apiResult.status === 'exit',
                [Style.apiResult]: true,
                [Style.monospace]: true
              })}>{apiResult.status === 'exit'? apiResult.output: JSON.stringify(apiResult.result, null, 2)}</div>
          </>
        }
      </div>

      {error && <div className={Style.serverErrorWapper!}>
          <div className={Style.serverError!}>
            <pre>{error.message}</pre>
          </div>
        </div>
      }

      <hr />

      <div className={Style.optionRows!}>
        <div className={Style.optionRow!}>
          <label className={Style.optionLabel} htmlFor="args-help">help:</label>
          <div className={Style.optionValueContainer!}>
            <input type="checkbox" name="help" id="args-help" checked={ help } onChange={({currentTarget: {name, checked}}: React.ChangeEvent<HTMLInputElement>) => setParams(old => ({...old, [name]: checked}))} />
            <label htmlFor="args-help">{help? 'True': 'False'}</label>
          </div>
        </div>

        <div className={Style.optionRow}>
          <label className={Style.optionLabel} htmlFor="args-version">version:</label>
          <div className={Style.optionValueContainer!}>
            <input type="text" placeholder="None" name="version" id="args-version" value={ version || '' } onChange={({currentTarget: {name, value}}: React.ChangeEvent<HTMLInputElement>) => setParams(old => ({...old, [name]: value===''? null: value}))} />
          </div>
        </div>

        <div className={Style.optionRow}>
          <label className={Style.optionLabel} htmlFor="args-stdopt">stdopt:</label>
          <div className={Style.optionValueContainer!}>
            <input type="checkbox" name="stdopt" id="args-stdopt" checked={ stdopt } onChange={({currentTarget: {name, checked}}: React.ChangeEvent<HTMLInputElement>) => setParams(old => ({...old, [name]: checked}))} />
            <label htmlFor="args-stdopt">{stdopt? 'True': 'False'}</label>
          </div>
        </div>

        <div className={Style.optionRow}>
          <label className={Style.optionLabel} htmlFor="args-attachopt">attachopt:</label>
          <div className={Style.optionValueContainer!}>
            <input type="checkbox" name="attachopt" id="args-attachopt" checked={ attachopt } onChange={({currentTarget: {name, checked}}: React.ChangeEvent<HTMLInputElement>) => setParams(old => ({...old, [name]: checked}))} />
            <label htmlFor="args-attachopt">{attachopt? 'True': 'False'}</label>
          </div>
        </div>

        <div className={Style.optionRow}>
          <label className={Style.optionLabel} htmlFor="args-attachvalue">attachvalue:</label>
          <div className={Style.optionValueContainer!}>
            <input type="checkbox" name="attachvalue" id="args-attachvalue" checked={ attachvalue } onChange={({currentTarget: {name, checked}}: React.ChangeEvent<HTMLInputElement>) => setParams(old => ({...old, [name]: checked}))} />
            <label htmlFor="args-attachvalue">{attachvalue? 'True': 'False'}</label>
          </div>
        </div>

        <div className={Style.optionRow}>
          <label className={Style.optionLabel} htmlFor="args-helpstyle">helpstyle:</label>
          <div className={Style.optionValueContainer!}>
            <select name="helpstyle" id="args-helpstyle" value={ helpstyle } onChange={({currentTarget: {name, value}}: React.ChangeEvent<HTMLSelectElement>) => setParams(old => ({...old, [name]: value===''? null: value}))}>
              <option value="python">python</option>
              <option value="dedent">dedent</option>
              <option value="raw">raw</option>
            </select>
          </div>
        </div>

        <div className={Style.optionRow}>
          <label className={Style.optionLabel} htmlFor="args-auto2dashes">auto2dashes:</label>
          <div className={Style.optionValueContainer!}>
            <input type="checkbox" name="auto2dashes" id="args-auto2dashes" checked={ auto2dashes } onChange={({currentTarget: {name, checked}}: React.ChangeEvent<HTMLInputElement>) => setParams(old => ({...old, [name]: checked}))} />
            <label htmlFor="args-auto2dashes">{auto2dashes? 'True': 'False'}</label>
          </div>
        </div>

        <div className={Style.optionRow}>
          <label className={Style.optionLabel} htmlFor="args-name">name:</label>
          <div className={Style.optionValueContainer!}>
            <input type="text" placeholder="None" name="name" id="args-name" value={ name || '' } onChange={({currentTarget: {name, value}}: React.ChangeEvent<HTMLInputElement>) => setParams(old => ({...old, [name]: value===''? null: value}))} />
          </div>
        </div>

        <div className={Style.optionRow}>
          <del>
            <label className={classNames(Style.optionLabel, Style.OptionDeleted!)} htmlFor="args-case_sensitive">case_sensitive:</label>
            <div className={Style.optionValueContainer!}>
              <input type="checkbox" id="args-case_sensitive" checked readOnly />
              <label htmlFor="args-case_sensitive">True  # deprecated</label>
            </div>
          </del>
        </div>

        <div className={Style.optionRow}>
          <label className={Style.optionLabel} htmlFor="args-optionsfirst">optionsfirst:</label>
          <div className={Style.optionValueContainer!}>
            <input type="checkbox" name="optionsfirst" id="args-optionsfirst" checked={ optionsfirst }  onChange={({currentTarget: {name, checked}}: React.ChangeEvent<HTMLInputElement>) => setParams(old => ({...old, [name]: checked}))} />
            <label htmlFor="args-optionsfirst">{optionsfirst? 'True': 'False'}</label>
          </div>
        </div>

        <div className={Style.optionRow}>
          <label className={Style.optionLabel} htmlFor="args-appearedonly">appearedonly:</label>
          <div className={Style.optionValueContainer!}>
            <input type="checkbox" name="appearedonly" id="args-appearedonly" checked={ appearedonly }  onChange={({currentTarget: {name, checked}}: React.ChangeEvent<HTMLInputElement>) => setParams(old => ({...old, [name]: checked}))} />
            <label htmlFor="args-appearedonly">{appearedonly? 'True': 'False'}</label>
          </div>
        </div>

        <div className={Style.optionRow}>
          <label className={Style.optionLabel} htmlFor="args-namedoptions">namedoptions:</label>
          <div className={Style.optionValueContainer!}>
            <input type="checkbox" name="namedoptions" id="args-namedoptions" checked={ namedoptions }  onChange={({currentTarget: {name, checked}}: React.ChangeEvent<HTMLInputElement>) => setParams(old => ({...old, [name]: checked}))} />
            <label htmlFor="args-namedoptions">{namedoptions? 'True': 'False'}</label>
          </div>
        </div>

        <div className={Style.optionRow}>
          <del>
            <label className={classNames(Style.optionLabel, Style.OptionDeleted!)} htmlFor="args-extra">extra:</label>
            <div className={Style.optionValueContainer!}>
              <input type="text" value="# not supported here #" readOnly disabled className={Style.OptionDeleted!}/>
            </div>
          </del>
        </div>

      </div>
    </form>
  </div>;
}
