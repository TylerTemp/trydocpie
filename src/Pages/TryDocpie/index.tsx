
import Style from './index.css';
// import Terminal, {Params as TerminalParams} from './Terminal';
import TerminalWrapper from "./TerminalWrapper";
import { Suspense, useMemo, useState } from "react";
import Version, { ApiVersion } from './Version';
import RetryErrorBoundary from "~/Components/RetryErrorBoundary";
import Suspendable from "~/Utils/Suspendable";
import Request from "~/Utils/Request";

export default () => {
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
        <TerminalWrapper />
    </>;
}