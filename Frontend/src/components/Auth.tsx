import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { loadCurrentUser } from '../actions/userActions';

/**
 * Keeping the user logged in 
 */
const Auth = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCurrentUser());
    });

    return <></>;
}

export default Auth;
