
import React from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => {
  const { loggedIn } = state.authReducer;
  return { isLoggedIn: loggedIn };
};

/** Proctects a component from unathenticated users */
const PrivateComponent = (props: any) => {
  const { component: Component, isLoggedIn, ...rest } = props;
  return isLoggedIn ? <Component props={rest} /> : <Redirect to='/login' />;
};

export default connect(mapStateToProps)(PrivateComponent);
