import Request from "~/Utils/Request";
import DoubleDotsSpinner from "~/Components/DoubleDotsSpinner";

import Suspendable from '~/Utils/Suspendable';
import { useMemo, useState } from "react";

export interface ApiVersion {
    version_time: number,
    version: string,
}

type FuncReturnApi = () => ApiVersion;

const versionTimeReadable = (versionTime: number) => {
    const date = new Date();
    date.setTime(versionTime * 1000);
    const year = date.getFullYear();
    const monthNum = date.getMonth() + 1;
    const dayNum = date.getDate();
    const hourNum = date.getHours();
    const minNum = date.getMinutes();
    const secNum = date.getSeconds();

    const month = `${monthNum < 10 ? "0" : ""}${monthNum}`;
    const day = `${dayNum < 10 ? "0" : ""}${dayNum}`;
    const hour = `${hourNum < 10 ? "0" : ""}${hourNum}`;
    const min = `${minNum < 10 ? "0" : ""}${minNum}`;
    const sec = `${secNum < 10 ? "0" : ""}${secNum}`;

    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

export default ({getApiVersion}: {getApiVersion: FuncReturnApi}) => {
    const {version, version_time: versionTime} = getApiVersion();
    return <p>docpie version {version}<br />updated at {versionTimeReadable(versionTime)}</p>;
}