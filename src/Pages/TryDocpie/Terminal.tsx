import { useState } from 'react';
// import Suspendable from '~/Utils/Suspendable';
import Style from './Terminal.css';
import classNames from 'classnames';


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
    run: boolean,
}

// const getData: () => string = Suspendable(new Promise<string>((resolve) => {
//     setTimeout(() => {
//         console.log("RESOLVED");
//         resolve("Resolved!")
//     }, 2000);
// }));

export default (params: Params) => {
    const [
        {
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
            run,
        },
        setParams
    ] = useState<Params>(params);

    return <div className={Style.container}>
    <form onSubmit={console.log}>
      <div className={classNames(Style.editor, Style.monospace)}>
        <span className={Style.comment}>#!/usr/bin/env python</span>
        <br />
        <span className={Style.comment}># -*- coding: utf-8 -*-</span>
        <br />
        <span className={Style.comment}># {name || `pie.py`}</span>
        <br />
        <span className={Style.string}>"""</span>
        <textarea className={Style.doc} name="doc" value={doc} placeholder="Input your doc string" required onChange={console.log} />
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
        <br/>
        <span className={Style.keyword}>print</span>(args)
      </div>

      <div className={classNames(Style['terminal-container'], Style.monospace)}>
        <div className={Style.terminal}>
          <label className={Style['exec-prefix']} htmlFor="argvnofilestr">
            <span className={Style.dollar}>$</span>
            {' '}
            python
            {' '}
            <span>{name || `pie.py`}</span>
            {' '}
          </label>
          <input className={Style.terminalInput} type="text" id="argvnofilestr" value={argvnofilestr} name="argvnofilestr" placeholder="# Input your argv" onChange={console.log} />
          <button type="submit" className={Style['terminal-enter']} aria-label="Enter">&#9166;</button>
        </div>
        {/* terminal result */}
        {/* <div className={classNames({[Style['api-error']]: apiError, [Style['api-result']]: true, [Style['monospace']]: true})}>{result}</div> */}
      </div>

      {/* <div className={Style['server-error-wapper']}>
        <div className={Style['server-error']}>
          <pre>{serverError}</pre>
        </div>
      </div> */}

      <hr />

      <div>
        <div className={Style['option-row']}>
          <label className={Style['option-label']} htmlFor="args-help">help:</label>
          <div className={Style['option-value-container']}>
            <input type="checkbox" name="help" id="args-help" checked={ help }  />
            <label htmlFor="args-help">{help? 'True': 'False'}</label>
          </div>
        </div>

        <div className={Style['option-row']}>
          <label className={Style['option-label']} htmlFor="args-version">version:</label>
          <div className={Style['option-value-container']}>
            <input type="text" placeholder="None" name="version" id="args-version" value={ version || '' }  />
          </div>
        </div>

        <div className={Style['option-row']}>
          <label className={Style['option-label']} htmlFor="args-stdopt">stdopt:</label>
          <div className={Style['option-value-container']}>
            <input type="checkbox" name="stdopt" id="args-stdopt" checked={ stdopt }  />
            <label htmlFor="args-stdopt">{stdopt? 'True': 'False'}</label>
          </div>
        </div>

        <div className={Style['option-row']}>
          <label className={Style['option-label']} htmlFor="args-attachopt">attachopt:</label>
          <div className={Style['option-value-container']}>
            <input type="checkbox" name="attachopt" id="args-attachopt" checked={ attachopt }  />
            <label htmlFor="args-attachopt">{attachopt? 'True': 'False'}</label>
          </div>
        </div>

        <div className={Style['option-row']}>
          <label className={Style['option-label']} htmlFor="args-attachvalue">attachvalue:</label>
          <div className={Style['option-value-container']}>
            <input type="checkbox" name="attachvalue" id="args-attachvalue" checked={ attachvalue }  />
            <label htmlFor="args-attachvalue">{attachvalue? 'True': 'False'}</label>
          </div>
        </div>

        <div className={Style['option-row']}>
          <label className={Style['option-label']} htmlFor="args-helpstyle">helpstyle:</label>
          <div className={Style['option-value-container']}>
            <select name="helpstyle" id="args-helpstyle" value={ helpstyle }>
              <option value="python">python</option>
              <option value="dedent">dedent</option>
              <option value="raw">raw</option>
            </select>
          </div>
        </div>

        <div className={Style['option-row']}>
          <label className={Style['option-label']} htmlFor="args-auto2dashes">auto2dashes:</label>
          <div className={Style['option-value-container']}>
            <input type="checkbox" name="auto2dashes" id="args-auto2dashes" checked={ auto2dashes }  />
            <label htmlFor="args-auto2dashes">{auto2dashes? 'True': 'False'}</label>
          </div>
        </div>

        <div className={Style['option-row']}>
          <label className={Style['option-label']} htmlFor="args-name">name:</label>
          <div className={Style['option-value-container']}>
            <input type="text" placeholder="None" name="name" id="args-name" value={ name || '' }  />
          </div>
        </div>

        <div className={Style['option-row']}>
          <del>
            <label className={classNames(Style['option-label'], Style['option-deleted'])} htmlFor="args-case_sensitive">case_sensitive:</label>
            <div className={Style['option-value-container']}>
              <input type="checkbox" id="args-case_sensitive" checked readOnly />
              <label htmlFor="args-case_sensitive">True  # deprecated</label>
            </div>
          </del>
        </div>

        <div className={Style['option-row']}>
          <label className={Style['option-label']} htmlFor="args-optionsfirst">optionsfirst:</label>
          <div className={Style['option-value-container']}>
            <input type="checkbox" name="optionsfirst" id="args-optionsfirst" checked={ optionsfirst }  />
            <label htmlFor="args-optionsfirst">{optionsfirst? 'True': 'False'}</label>
          </div>
        </div>

        <div className={Style['option-row']}>
          <label className={Style['option-label']} htmlFor="args-appearedonly">appearedonly:</label>
          <div className={Style['option-value-container']}>
            <input type="checkbox" name="appearedonly" id="args-appearedonly" checked={ appearedonly }  />
            <label htmlFor="args-appearedonly">{appearedonly? 'True': 'False'}</label>
          </div>
        </div>

        <div className={Style['option-row']}>
          <label className={Style['option-label']} htmlFor="args-namedoptions">namedoptions:</label>
          <div className={Style['option-value-container']}>
            <input type="checkbox" name="namedoptions" id="args-namedoptions" checked={ namedoptions }  />
            <label htmlFor="args-namedoptions">{namedoptions? 'True': 'False'}</label>
          </div>
        </div>

        <div className={Style['option-row']}>
          <del>
            <label className={classNames(Style['option-label'], Style['option-deleted'])} htmlFor="args-extra">extra:</label>
            <div className={Style['option-value-container']}>
              <input type="text" value="# not supported here #" readOnly disabled className={Style['option-deleted']}/>
            </div>
          </del>
        </div>

      </div>
    </form>
  </div>;
}
