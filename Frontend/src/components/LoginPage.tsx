import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { axiosClient as axios } from '../services/axiosClient';
import { login } from '../actions/authActions';

const mapDispatchToProps = (dispatch: any) => ({
    login: (username: string, password: string) => dispatch(login(username, password)),
});

interface Props {
    history: any,
    login: (username: string, password: string) => Promise<string>
}

interface State {
    username: string,
    password: string,
    submitted: boolean
}

class LoginPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };
    }

    handleChange = (ev: any) => {
        const { name, value } = ev.target;

        // @ts-ignore
        this.setState({ [name]: value });
    }

    handleSubmit = (ev: any) => {
        ev.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password)
                .then(res => {
                    const token = sessionStorage.getItem('accessToken');
                    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
                    this.props.history.push('/');
                });
        }
    }

    render() {
        const { username, password, submitted } = this.state;

        return (
            <div className="row bg-white vh-100">
                <div className="col-12 col-md-6 login-left"></div>
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center bg-green">
                    <form name="form" onSubmit={this.handleSubmit}>
                        <h2 className="font-weight-bold mb-3">Let's be productive!</h2>
                        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                            {submitted && !username &&
                                <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Login</button>
                            <Link to="/register" className="btn btn-link">Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(LoginPage);
