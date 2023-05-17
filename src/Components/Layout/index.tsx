import React, {Fragment} from 'react';
import {
  NavLink, Outlet,
} from 'react-router-dom';

import classNames from 'classnames';

// import CenterWidthLimit from '~/component/center_width_limit/CenterWidthLimit';
import layoutStyle from './index.css';
// import centerWidthLimitStyle from '~/component/center_width_limit/center_width_limit.css';

const NavLinkClass = ({isActive}: {isActive: boolean}) => isActive
    ? classNames(layoutStyle.active, layoutStyle.navLink)
    : layoutStyle.navLink;


export default () => (
  <>
    <header className={classNames(layoutStyle.centerContainer, layoutStyle.topbar)}>
      <nav className={classNames(layoutStyle.widthLimit, layoutStyle.nav)}>
        <NavLink to="/" className={NavLinkClass}>Home</NavLink>
        <NavLink to="/document" className={NavLinkClass}>Document</NavLink>
        <NavLink to="/try" className={NavLinkClass}>Try Online</NavLink>
      </nav>
    </header>
    <div className={layoutStyle.centerContainer}>
        <div className={layoutStyle.widthLimit}>
            <Outlet />
        </div>
    </div>
  </>
);
