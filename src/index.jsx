import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // NavLink,
} from 'react-router-dom';

// import 'purecss/build/pure.css';

import Layout from '~/component/layout/Layout';
import Home from '~/page/home/Home';
import Document from '~/page/document/Document';
import TryDocpie from '~/page/try_docpie/TryDocpie';
import NotFound from '~/page/NotFound';


const App = () => (
  <Fragment>
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/document" exact component={Document} />
          <Route path="/document/:id" exact component={Document} />
          <Route path="/try" exact component={TryDocpie} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  </Fragment>
);


ReactDom.render(
  <App />,
  document.getElementById('root'),
);
