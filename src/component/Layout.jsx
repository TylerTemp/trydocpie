import React from 'react';
import {
  NavLink,
} from 'react-router-dom';


const Layout = ({children}) => (
  <div>
    [<NavLink to="/">Home</NavLink>]
    [<NavLink to="/doc">Document</NavLink>]
    [<NavLink to="/try">Try Online</NavLink>]
    {children}
  </div>
);


export default Layout;
