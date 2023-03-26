/**
 *
 * Authentication
 *
 */

import React from 'react';

import { Navigate  } from 'react-router-dom';

import actions from '../../actions';

export default function (ComposedComponent) {
  class Authentication extends React.PureComponent {
    render() {
      // const { authenticated } = this.props || false;

      // if (!authenticated) {
      //   return <Navigate  to='/login' />;
      // } else {
        return <ComposedComponent {...this.props} />;
      // }
    }
  }

  // const mapStateToProps = state => {
  //   return {
  //     authenticated: state.authentication.authenticated || false
  //   };
  // };

  // return connect(mapStateToProps, actions)(Authentication);

}
