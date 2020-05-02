
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux';

const mapStateToProps = (state: any) => {
    const { loggedIn } = state.authReducer;
    return { isLoggedIn: loggedIn }
}

/** Redirects an unathenticated user to login page */
const PrivateRoute = (props: any) => {
    const { component: Component, isLoggedIn, ...rest } = props;
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    )
            }
        />
    )
}

export default connect(mapStateToProps, null)(PrivateRoute);