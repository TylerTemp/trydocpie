import React from 'react';
import doubleDotsSpinerStyle from './double_dots_spinner.css';


const DoubleDotsSpinner = ({color="white"}) => (
  <div className={doubleDotsSpinerStyle.spinner}>
    <div className={doubleDotsSpinerStyle.dot1} style={{backgroundColor: color}}></div>
    <div className={doubleDotsSpinerStyle.dot2} style={{backgroundColor: color}}></div>
  </div>
);


export default DoubleDotsSpinner;
