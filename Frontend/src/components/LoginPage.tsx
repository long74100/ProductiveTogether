import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner'

import { User } from '../models/User';
import { axiosClient as axios } from '../services/axiosClient';
import { login } from '../actions/authActions';
import { loadCurrentUser } from '../actions/userActions';

const mapDispatchToProps = (dispatch: any) => ({
    login: (username: string, password: string) => dispatch(login(username, password)),
    loadCurrentUser: () => dispatch(loadCurrentUser())
});

type Props = {
    history: any,
    login: (username: string, password: string) => Promise<string>,
    loadCurrentUser: () => Promise<User>
}

type State = {
    username: string,
    password: string,
    loading: boolean,
    submitted: boolean,
    error?: string
}

class LoginPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loading: false,
            submitted: false,
            error: undefined
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
            this.setState({ loading: true });
            this.props.login(username, password)
                .then(res => {
                    const token = sessionStorage.getItem('accessToken');
                    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
                })
                .then(res => {
                    this.props.loadCurrentUser();
                    this.props.history.push('/');
                })
                .catch(error => {
                    this.setState({ loading: false, error: 'Oops something went wrong!' })
                });
        }
    }

    render() {
        const { username, password, submitted, loading, error } = this.state;

        return (
            <div className='row bg-white mw-100 p-5'>
                <div className='col-12 d-flex justify-content-center'>
                    <form name='form' onSubmit={this.handleSubmit}>
                        <img
                            src='/logo.png'
                            width='150'
                            alt='ProductiveTogether'
                        />
                        <h2 className='font-weight-bold mt-3'>Let's be productive!</h2>
                        <div className='form-group'>
                            <label htmlFor='username'>Username</label>
                            <input type='text' className='form-control' name='username' value={username} onChange={this.handleChange} />
                            {submitted && !username &&
                                <div className='text-danger'>Username is required</div>
                            }
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' className='form-control' name='password' value={password} onChange={this.handleChange} autoComplete='on' />
                            {submitted && !password &&
                                <div className='text-danger'>Password is required</div>
                            }
                        </div>
                        <div className='form-group'>
                            <button className='btn btn-primary d-block w-100' disabled={loading}>
                                {loading ?
                                    <Spinner animation='border' role='status'>
                                        <span className='sr-only'>Loading...</span>
                                    </Spinner> : 'Sign in'}
                            </button>
                            <p className='text-danger text-center mt-1'>{error}</p>
                            <p className='mt-3 text-center'>Not a user? <Link to='/register' className='btn-link'>Create a log-in</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(LoginPage);
