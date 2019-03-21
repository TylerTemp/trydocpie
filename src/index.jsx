import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
} from 'react-router-dom';

import Home from '~/page/Home';
import TryDocpie from '~/page/TryDocpie';
import NotFound from '~/page/NotFound';

const Layout = ({children}) => (
  <div>
    [<NavLink to="/">Home</NavLink>]
    [<NavLink to="/doc">Document</NavLink>]
    [<NavLink to="/try">Try Online</NavLink>]
    {children}
  </div>
)

const App = () => (
  <Fragment>
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
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
