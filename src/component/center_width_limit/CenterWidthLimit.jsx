import React from 'react';
import centerWidthLimitStyle from './center_width_limit.css';


const CenterWidthLimit = ({children, spacingAround=10}) => {
  return <div className={centerWidthLimitStyle.container}>
    <div className={centerWidthLimitStyle.limit} style={{padding: `${spacingAround}px`}}>
      {children}
    </div>
  </div>
};


export default CenterWidthLimit;
