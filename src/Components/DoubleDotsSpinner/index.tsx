import { CSSProperties } from 'react';
import doubleDotsSpinerStyle from './index.css';


export default ({color="#a19f9f", size=40, style={}}: {color?: string, size?: number, style?: CSSProperties}) =>
    <div className={doubleDotsSpinerStyle.spinner} style={{width: size, height: size, ...style}}>
        <div className={doubleDotsSpinerStyle.dot1} style={{backgroundColor: color}}></div>
        <div className={doubleDotsSpinerStyle.dot2} style={{backgroundColor: color}}></div>
    </div>;
