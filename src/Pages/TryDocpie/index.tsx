import { useLocation } from "react-router-dom"
import queryString from 'query-string';

import Style from './index.css';
import Terminal, {Params as TerminalParams} from './Terminal';
import { Suspense, useMemo, useState } from "react";
import Version, { ApiVersion } from './Version';
import RetryErrorBoundary from "~/Components/RetryErrorBoundary";
import Suspendable from "~/Utils/Suspendable";
import Request from "~/Utils/Request";
// import defaultConfig from './DefaultParams.json';

const defaultDoc: string = "Naval Fate.\n\nUsage:\n  naval_fate ship new <name>...\n  naval_fate ship <name> move <x> <y> [--speed=<km/h>]\n  naval_fate ship shoot <x> <y>\n  naval_fate mine (set|remove) <x> <y> [--moored|--drifting]\n  naval_fate -h | --help\n  naval_fate --version\n\nOptions:\n  -h -? --help    Show this screen.\n  --version       Show version.\n  --speed=<km/h>  Speed in knots.[default: 10]\n  --moored        Moored (anchored) mine.\n  --drifting      Drifting mine.";

interface QueryParams {
    doc?: string,
    argvnofilestr?: string,
    help?: string,
    version?: string,
    stdopt?: string,
    attachopt?: string,
    attachvalue?: string,
    helpstyle?: 'python' | 'dedent' | 'raw',
    auto2dashes?: string,
    name?: string,
    optionsfirst?: string,
    appearedonly?: string,
    namedoptions?: string,
    run?: string,
}

export default () => {
    const {search=''} = useLocation();
    const queryParams: QueryParams = queryString.parse(search);
    // return <p>{JSON.stringify(defaultConfig)}</p>
    const pageParams: TerminalParams = {
        doc: queryParams.doc? queryParams.doc as string: defaultDoc,
        argvnofilestr: queryParams.argvnofilestr || '',
        help: queryParams.help !== undefined,
        version: queryParams.version === undefined? null: queryParams.version as string,
        stdopt: queryParams.stdopt !== undefined,
        attachopt: queryParams.attachopt !== undefined,
        attachvalue: queryParams.attachvalue !== undefined,
        helpstyle: queryParams.helpstyle === undefined? 'python': queryParams.helpstyle,
        auto2dashes: queryParams.auto2dashes !== undefined,
        name: queryParams.name === undefined ? null: queryParams.name as string,
        optionsfirst: queryParams.optionsfirst !== undefined,
        appearedonly: queryParams.appearedonly !== undefined,
        namedoptions: queryParams.namedoptions !== undefined,
        run: queryParams.run !== undefined
    }

    const [retry, setRetry] = useState<number>(1);

    const getApiVersion: (() => ApiVersion) = useMemo(() => {
        return Suspendable(Request(`/`).then(resp => resp.json()).then(json => json as ApiVersion))
    }, [retry]);

    return <>
        <h2 className={Style.title!}>Try docpie</h2>
        <RetryErrorBoundary onRetry={() => {setRetry(old => -old);}}>
            <Suspense fallback={<p>loading</p>}>
                <Version getApiVersion={getApiVersion} key={retry}/>
            </Suspense>
        </RetryErrorBoundary>
        {/* <Page {...pageParams} key={search} /> */}
    </>;
}