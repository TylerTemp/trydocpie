import React from 'react';
import DoubleBouncersStyle from './double_bouncers.css';


const DoubleBouncers = () => (
  <div className={DoubleBouncersStyle.spinner}>
    <div className={DoubleBouncersStyle['double-bounce1']}></div>
    <div className={DoubleBouncersStyle['double-bounce2']}></div>
  </div>
);


export default DoubleBouncers;
