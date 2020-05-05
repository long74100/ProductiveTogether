import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner'

import { User } from '../models/User';
import { register } from '../services/userService';
import { axiosClient as axios } from '../services/axiosClient';
import { login } from '../actions/authActions';
import { loadCurrentUser } from '../actions/userActions';

const mapDispatchToProps = (dispatch: any) => ({
    login: (username: string, password: string) => dispatch(login(username, password)),
    loadCurrentUser: () => dispatch(loadCurrentUser())
});

type Props = {
    history: any,
    login: (username: string, password: string) => Promise<string>
    loadCurrentUser: () => Promise<User>
}

type State = {
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string,
    submitted: boolean,
    loading: boolean,
    error?: string
}

class RegisterPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            submitted: false,
            loading: false,
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
        const { username, email, firstName, lastName, password, confirmPassword } = this.state;

        if (username && email && firstName && lastName && password && confirmPassword) {
            if (password != confirmPassword) {
                this.setState({
                    error: 'Passwords do not match'
                })
                return;
            }

            this.setState({ loading: true })
            register(username, email, firstName, lastName, password)
                .then(res => {
                    this.props.login(username, password)
                        .then(res => {
                            const token = sessionStorage.getItem('accessToken');
                            axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
                            this.props.loadCurrentUser();
                        }).catch(error => {
                            this.setState({ loading: false, error: 'Oops something went wrong!' })
                        });
                })
                .catch(error => this.setState({ loading: false, error: 'Oops something went wrong!' }));
        }
    }

    render() {
        const {
            username,
            email,
            firstName,
            lastName,
            password,
            confirmPassword,
            submitted,
            loading,
            error
        } = this.state;

        return (
            <div className='row bg-white p-5 mw-100'>
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
                            <label htmlFor='email'>Email</label>
                            <input type='email' className='form-control' name='email' value={email} onChange={this.handleChange} />
                            {submitted && !email &&
                                <div className='text-danger'>First name is required</div>
                            }
                        </div>
                        <div className='form-group'>
                            <label htmlFor='firstName'>First name</label>
                            <input type='text' className='form-control' name='firstName' value={firstName} onChange={this.handleChange} />
                            {submitted && !firstName &&
                                <div className='text-danger'>First name is required</div>
                            }
                        </div>
                        <div className='form-group'>
                            <label htmlFor='lastName'>Last name</label>
                            <input type='text' className='form-control' name='lastName' value={lastName} onChange={this.handleChange} />
                            {submitted && !lastName &&
                                <div className='text-danger'>Last name is required</div>
                            }
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' className='form-control' name='password' value={password} onChange={this.handleChange} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$" title="Must contain at least one number, one special character, one uppercase and lowercase letter, and at least 8 or more characters" />
                            {submitted && !password &&
                                <div className='text-danger'>Password is required</div>
                            }
                        </div>
                        <div className='form-group'>
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input type='password' className='form-control' name='confirmPassword' value={confirmPassword} onChange={this.handleChange} />
                            {submitted && !confirmPassword &&
                                <div className='text-danger'>Confirm Password is required</div>
                            }
                        </div>

                        <div className='form-group'>
                            <button className='btn btn-primary d-block w-100' disabled={loading}>
                                {loading ?
                                    <Spinner animation='border' role='status'>
                                        <span className='sr-only'>Loading...</span>
                                    </Spinner> : 'Sign up'}
                            </button>
                            <p className='text-danger text-center mt-1'>{error}</p>
                            <p className='mt-3 text-center'>Already have an account? <Link to='/login' className='btn-link'>Sign in</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(null, mapDispatchToProps)(RegisterPage);
