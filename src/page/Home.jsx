import React, { Fragment, Component } from 'react';
import {
  Link
} from 'react-router-dom';


class Home extends Component {

  componentDidMount() {
    this.props.history.push('/try');
  }

  render() {
    return <Fragment>
      <Link to="/try">to try</Link>
    </Fragment>;
  }
}


export default Home;
