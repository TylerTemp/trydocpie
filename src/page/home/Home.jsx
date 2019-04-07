import React, { Fragment, Component } from 'react';
import {
  Link,
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
import homeStyle from './home.css';


const parseHTML = (html) => (
  new ReactHtmlParser(html, {
      transform: (node, index) => {
        const {type: nodeType, name: nodeName} = node;
        if(nodeType === 'tag' && nodeName === 'a') {
          const {attribs, children} = node;
          const {href} = attribs;
          if(href.startsWith('/')) {
            return <Link key={index} to={href} className={homeStyle['menu-link']} activeClassName={homeStyle['menu-link-active']}>
              {children.map(({data}) => data)}
            </Link>;
          } else if(href.startsWith('#')) {
          } else {
            return <a key={index} target='_blank' {...attribs}>{children.map(({data}) => data)}</a>;
          }
        } else if(nodeType === 'tag' && nodeName === 'h1') {
          const {children} = node;
          return <Fragment key={index}>
            <h1 className={homeStyle.title}>{children.map(({data}) => data)}</h1>
            <hr />
          </Fragment>
        };
      }
    }
  )
);


const homePageResource = createResource(() => apiCaller.get(`/static/docpie/README.html`));


const HomePage = () => {
  const content = homePageResource.read();
  return parseHTML(content);
}

const Home = () => {
  return <Fragment>
    <CenterWidthLimit>
      <Suspenser fallback={<DoubleBouncers color="#00000042" />}>
        <HomePage />
      </Suspenser>
    </CenterWidthLimit>
  </Fragment>;
}

export default Home;
