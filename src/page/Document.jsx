import React, { Fragment, Component, Suspense } from 'react';
import {
  Link
} from 'react-router-dom';

import {
  observer
} from 'mobx-react';

import CenterWidthLimit from '~/component/center_width_limit/CenterWidthLimit';
// import staticHTMLStorage from '~/storage/staticHTMLStorage';


// const Menu = async() => {
//   let promise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve(<p>OK</p>), 1000);
//   });
//   return await promise;
// }


// @observer
class Document extends Component {

  // componentDidMount() {
  //   this.timer = setTimeout(() => {
  //     this.props.history.push('/try');
  //   }, 3000);
  // }

  // componentWillUnmount() {
  //   clearTimeout(this.timer);
  // }

  // componentWillMount() {
  //   staticHTMLStorage.getPage(`docpie-wiki/Home.html`);
  //   staticHTMLStorage.getPage(`menu`);
  // }

  render() {

    // const {
    //   pageSubmitting,
    //   pageError,
    //   pageResults,
    //   menuSubmitting,
    //   menuError,
    //   menu,
    // } = staticHTMLStorage;

    const Sus = () => (new Promise(resolve => {
      setTimeout(() => (resolve(<p>OK</p>)), 1000)
    }));

    return <Fragment>
      <CenterWidthLimit>
        {/* {menu} */}
        <Suspense fallback={<p>loading...</p>}>
          {/* <Menu /> */}
        </Suspense>
      </CenterWidthLimit>
    </Fragment>;
  }
}


export default Document;
