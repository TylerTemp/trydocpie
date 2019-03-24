import React, {Fragment} from 'react';
import {
  NavLink,
} from 'react-router-dom';

import classNames from 'classnames';

import CenterWidthLimit from '~/component/center_width_limit/CenterWidthLimit';
import layoutStyle from './layout.css';
import centerWidthLimitStyle from '~/component/center_width_limit/center_width_limit.css';


const Layout = ({children}) => (
  <Fragment>
    <header className={classNames(centerWidthLimitStyle.container, layoutStyle.topbar)}>
      <nav className={classNames(centerWidthLimitStyle.limit, layoutStyle.nav)}>
        <NavLink to="/" exact className={layoutStyle['nav-link']} activeClassName={layoutStyle['active']}>Home</NavLink>
        <NavLink to="/document" className={layoutStyle['nav-link']} activeClassName={layoutStyle['active']}>Document</NavLink>
        <NavLink to="/try" className={layoutStyle['nav-link']} activeClassName={layoutStyle['active']}>Try Online</NavLink>
      </nav>
    </header>
    {children}
  </Fragment>
);


export default Layout;
