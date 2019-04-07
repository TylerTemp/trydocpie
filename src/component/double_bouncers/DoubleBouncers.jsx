import React from 'react';
import DoubleBouncersStyle from './double_bouncers.css';


const DoubleBouncers = ({color}) => (
  <div className={DoubleBouncersStyle.spinner}>
    <div className={DoubleBouncersStyle['double-bounce1']} style={color? {backgroundColor: color}: null}></div>
    <div className={DoubleBouncersStyle['double-bounce2']} style={color? {backgroundColor: color}: null}></div>
  </div>
);


export default DoubleBouncers;
