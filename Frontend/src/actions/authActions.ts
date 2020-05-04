import { getAccessToken } from '../services/authService';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS
}

export type AuthActionTypes = LoginSuccessAction

export const login = (username: string, password: string) => (dispatch: any) => {
    return getAccessToken(username, password).then(data => {
        // https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage
        sessionStorage.setItem('accessToken', data.token);
        sessionStorage.setItem('refreshToken', data.refreshToken);
        dispatch({
            type: LOGIN_SUCCESS
        });
        return data.access;
    });
};