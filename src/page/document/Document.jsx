import React, { Fragment, Component } from 'react';
import {
  Link,
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


const parseHTML = (html, linkType) => {
  const LinkNode = linkType === undefined? Link: NavLink;
  return new ReactHtmlParser(html, {
      transform: (node, index) => {
        const {type: nodeType, name: nodeName} = node;
        if(nodeType == 'tag' && nodeName == 'a') {
          const {attribs, children} = node;
          const {href} = attribs;
          if(href.startsWith('/')) {
            return <LinkNode key={index} to={href} className={documentStyle['menu-link']} activeClassName={documentStyle['menu-link-active']}>
              {children.map(({data}) => data)}
            </LinkNode>;
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


const Menu = () => {
  const content = menuResource.read();
  return parseHTML(content, NavLink);
}


const pageResource = createResource(pageId => apiCaller.get(`/static/docpie-wiki/${pageId}.html`));


const Page = ({page}) => {
  const content = pageResource.read(page);
  return parseHTML(content);
}

const Document = ({match: {params: {id='Home'}}}) => {
  const title = id === 'Home'? 'Document for docpie' : (id.replace(new RegExp('-', 'g'), ' '));
  return <Fragment>
    <CenterWidthLimit>
      <h2 className={documentStyle.title}>{title}</h2>
      <hr />
      <div className={documentStyle['menu-wrapper']}>
        <div className={documentStyle.menu}>
          <div className={documentStyle['menu-title']}>
            <h6 className={documentStyle['menu-title-content']}>Table of Content</h6>
            <hr className={documentStyle['menu-title-sep']} />
          </div>
          <div  className={documentStyle['menu-body']}>
            <Suspenser fallback={<DoubleBouncers color="#00000042" />}>
              <Menu />
            </Suspenser>
          </div>
        </div>
      </div>
      <Suspenser fallback={<DoubleBouncers color="#00000042" />}>
        <Page page={id} />
      </Suspenser>
    </CenterWidthLimit>
  </Fragment>;
}

export default Document;
