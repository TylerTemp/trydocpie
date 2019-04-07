import React, { Fragment, Component } from 'react';
import {
  // Link,
  NavLink
} from 'react-router-dom';

import {
  observer
} from 'mobx-react';
import { unstable_createResource as createResource } from "react-cache";
import ReactHtmlParser, { convertNodeToElement } from 'react-html-parser';

import DoubleBouncers from '~/component/double_bouncers/DoubleBouncers';
import Suspenser from '~/component/Suspenser';
import apiCaller from '~/component/apiCaller';
import CenterWidthLimit from '~/component/center_width_limit/CenterWidthLimit';
import documentStyle from './document.css';


const parseHTML = (html) => {
  return new ReactHtmlParser(html, {
      transform: (node, index) => {
        const {type: nodeType, name: nodeName} = node;
        if(nodeType == 'tag' && nodeName == 'a') {
          const {attribs, children} = node;
          const {href} = attribs;
          if(href.startsWith('/')) {
            return <NavLink key={index} to={href} activeClassName={documentStyle['menu-link-active']} className={documentStyle['menu-link']}>
              {children.map(({data}) => data)}
            </NavLink>;
          } else if(href.startsWith('#')) {
          } else {
            return <a key={index} target='_blank' {...attribs}>{children.map(({data}) => data)}</a>;
          }
        };
      }
    }
  );
};


const menuResource = createResource(() => apiCaller.get(`/static/docpie-wiki/_Sidebar.html`));


const MenuContent = () => {
  const content = menuResource.read();
  return parseHTML(content);
}


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  openMenu() {
    this.setState({open: true});
  }

  closeMenu() {
    this.setState({open: false});
  }

  render() {
    const {open} = this.state;
    if(!open) {
      return (
        <div className={documentStyle['menu-wrapper']} onClick={() => {this.openMenu()}}>
          <div className={documentStyle.menu}>
            <div className={documentStyle['menu-title']}>
              <h6 className={documentStyle['menu-title-content']}><span className={documentStyle['grey']}>[</span>+<span className={documentStyle['grey']}>]</span></h6>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className={documentStyle['menu-wrapper']}>
        <div className={documentStyle.menu}>
          <div className={documentStyle['menu-title']} onClick={() => {this.closeMenu()}}>
            <h6 className={documentStyle['menu-title-content']}>
              <span className={documentStyle['grey']}>[-&gt;</span> TOC <span className={documentStyle['grey']}>&lt;-]</span>
            </h6>
            <hr className={documentStyle['menu-title-sep']} />
          </div>
          <div  className={documentStyle['menu-body']}>
            <Suspenser fallback={<DoubleBouncers color="#00000042" />}>
              <MenuContent />
            </Suspenser>
          </div>
          <div  className={documentStyle['menu-footer']} onClick={() => {this.closeMenu()}}>
            <hr className={documentStyle['menu-title-sep']} />
            <span className={documentStyle['grey']}>^</span>
          </div>
        </div>
      </div>
    );
  }
}


export default Menu;
