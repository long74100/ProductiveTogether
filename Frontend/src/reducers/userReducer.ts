import { User } from '../models/User';
import { GET_CURRENT_USER, UserActionTypes } from '../actions/userActions';


export interface UserState {
    currentUser: User,
    users: { [id: string]: User }
}

const initialState: UserState = {
    currentUser: {
        id: '',
        userName: '',
        firstName: '',
        lastName: '',
        email: ''
    },
    users: {}
}

export default (state = initialState, action: UserActionTypes) => {
    switch (action.type) {
        case GET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        default: return state
    }
}