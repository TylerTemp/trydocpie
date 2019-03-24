import React from 'react';
import doubleDotsSpinerStyle from './double_dots_spinner.css';


const DoubleDotsSpinner = () => (
  <div className={doubleDotsSpinerStyle.spinner}>
    <div className={doubleDotsSpinerStyle.dot1}></div>
    <div className={doubleDotsSpinerStyle.dot2}></div>
  </div>
);


export default DoubleDotsSpinner;
