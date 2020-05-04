
import React from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => {
    const { loggedIn } = state.authReducer;
    return { isLoggedIn: loggedIn };
};

/** Proctects a component from authenticated users */
const PublicComponent = (props: any) => {
    const { component: Component, isLoggedIn, ...rest } = props;
    return isLoggedIn ? <Redirect to='/' /> : <Component props={rest} />;
};

export default connect(mapStateToProps)(PublicComponent);
