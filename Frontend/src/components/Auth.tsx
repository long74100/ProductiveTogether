import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { User } from '../models/User';
import { loadCurrentUser } from '../actions/userActions';

const mapDispatchToProps = (dispatch: any) => ({
    loadCurrentUser: () => dispatch(loadCurrentUser())
});

type Props = {
    loadCurrentUser: () => Promise<User>
}

/**
 * Keeping the user logged in 
 */
const Auth = (props: Props) => {
    useEffect(() => {
        props.loadCurrentUser();
    }, []);

    return (<></>)
}

export default connect(null, mapDispatchToProps)(Auth);
