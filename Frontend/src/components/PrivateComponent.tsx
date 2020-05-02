
import React from 'react'
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => {
  const { loggedIn } = state.authReducer;
  return { isLoggedIn: loggedIn };
};

/** Proctects a component from unathenticated users */
const PrivateComponent = (props: any) => {
  const { component: Component, isLoggedIn, ...rest } = props;
  return isLoggedIn ? <Component props={rest} /> : null;
};

export default connect(mapStateToProps)(PrivateComponent);
