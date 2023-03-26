/**
 *
 * AuthSuccess
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Navigate  } from 'react-router-dom';

import actions from '../../actions';
import setToken from '../../utils/token';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class AuthSuccess extends React.PureComponent {
  componentDidMount() {
    const token = localStorage.getItem('token');
    setToken(token);
  }

  render() {
    const { authenticated } = this.props;

    if (authenticated) return <Navigate  to='/dashboard' />;

    return <LoadingIndicator />;
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authentication.authenticated
  };
};

export default connect(mapStateToProps, actions)(AuthSuccess);
