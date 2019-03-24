import React from 'react';
import DoubleBouncersStyle from './double_bouncers.css';


const DoubleBouncers = () => (
  <div class={DoubleBouncersStyle.spinner}>
    <div class={DoubleBouncersStyle['double-bounce1']}></div>
    <div class={DoubleBouncersStyle['double-bounce2']}></div>
  </div>
);


export default DoubleBouncers;
