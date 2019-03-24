import React, { Fragment, Component } from 'react';
import {
  Link
} from 'react-router-dom';

import CenterWidthLimit from '~/component/center_width_limit/CenterWidthLimit';


class Document extends Component {

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.history.push('/try');
    }, 3000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return <Fragment>
      <CenterWidthLimit>
        Sorry, this page has not finished.
        Redirecting to <Link to="/try">Try Online</Link> in 3 seconds.
      </CenterWidthLimit>
    </Fragment>;
  }
}


export default Document;
