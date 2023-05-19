import { useLocation, useNavigate } from "react-router-dom"
import queryString from 'query-string';

import Terminal, {Params as TerminalParams} from './Terminal';
import { useState } from "react";
import ReplaceAll from "~/Utils/ReplaceAll";

const defaultDoc: string = "Naval Fate.\n\nUsage:\n  naval_fate ship new <name>...\n  naval_fate ship <name> move <x> <y> [--speed=<km/h>]\n  naval_fate ship shoot <x> <y>\n  naval_fate mine (set|remove) <x> <y> [--moored|--drifting]\n  naval_fate -h | --help\n  naval_fate --version\n\nOptions:\n  -h -? --help    Show this screen.\n  --version       Show version.\n  --speed=<km/h>  Speed in knots.[default: 10]\n  --moored        Moored (anchored) mine.\n  --drifting      Drifting mine.\n";

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

    replace?: boolean,
    // run?: string,
}

type ValueType = string | number | boolean | null | undefined;

// interface Struct {
//     [key: string]: ValueType;
// }

const queryStringify = (curParams: TerminalParams): string => {
    const queryParams = [];

    for (const key in curParams) {
        if (curParams.hasOwnProperty(key)) {
            const value: ValueType = curParams[key as keyof TerminalParams] as ValueType;

            if (value !== null && value !== false && value !== undefined)
            {
                const valueInitConvert = value === true
                    ? '1'
                    : value.toString();
                queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(valueInitConvert)}`);
            }
      }
    }

    return queryParams.join('&');
}

const ReplaceN = (doc: string, replace: boolean) => {
    if(!replace) {
        return doc;
    }

    // console.log(`replace \\n for ${doc}`);
    // const result = doc.replaceAll('\\n', '\n');;
    // console.log(result);
    // return result;
    // return doc.replace('\\n', '\n');
    return ReplaceAll(doc, '\\n', '\n');
}

export default () => {
    const {search=''} = useLocation();

    const [prevSearch, setPrevSearch] = useState<string>(search);
    const [pageChanged, onPageChange] = useState<number>(-1);
    const navigate = useNavigate();

    const onSubmitCallback = (curParams: TerminalParams) => {
        const newQuery = `?${queryStringify(curParams)}`;
        setPrevSearch(newQuery);
        navigate(newQuery);
    }

    let pageKey = pageChanged;
    if(prevSearch !== search) {
        pageKey = -pageKey;
        onPageChange(pageKey);
        setPrevSearch(search);
        console.log(`flip page`);
        // return <></>;
    }

    const queryParams: QueryParams = queryString.parse(search);
    const hasQueryParams = Object.keys(queryParams).length > 0;
    const replaceN = queryParams.replace !== undefined;
    // console.log(`replaceN=${replaceN}`)
    const pageParams: TerminalParams = hasQueryParams
    ? {
        doc: ReplaceN(queryParams.doc! as string, replaceN),
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

        onSubmitCallback,
        // run: queryParams.run !== undefined
    }
    : {
        doc: defaultDoc,
        argvnofilestr: '',
        help: true,
        version: null,
        stdopt: true,
        attachopt: true,
        attachvalue: true,
        helpstyle: 'python',
        auto2dashes: true,
        name: null,
        optionsfirst: false,
        appearedonly: false,
        namedoptions: false,

        onSubmitCallback,
        // run: false,
    }
    return <Terminal {...pageParams} key={pageKey}/>;
}