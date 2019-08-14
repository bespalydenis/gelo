import React from 'react'
// import { connect } from "react-redux";
import classnames from "classnames"
import axios from "axios";
import { connect } from 'react-redux';
import setAuthToken from '../../utils/setAuthToken';
import jwt from 'jsonwebtoken';
import {requestUsers, login} from "../../store/actions";

class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
      e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        console.log('>> i', userData);

        this.props.login(userData);

        // axios.post('/api/users/login', {email: userData.email, password: userData.password})
        //     .then(res => {
        //         localStorage.setItem('jwtToken', res.data.token);
        //         setAuthToken(res.data.token);
        //         console.log('>> Token', jwt.decode(res.data.token));
        //         alert('Login Success!');
        //         window.location.href = './'
        //     })
        //     .catch(err => {
        //         console.log('>>',err)
        //     })
    };

    render() {
        const { errors } = this.state;

        if(this.props.isLoggedIn)
            window.location.href = './';

        return (
            <section className={"form"}>
                <div className="wr">
                    <h1>Login Page</h1>
                    <form noValidate onSubmit={this.onSubmit}>
                        <label>
                            Email
                            <input
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id={"email"}
                                type={"email"}
                                className={classnames("", {
                                    invalid: errors.email || errors.emailnotfound
                                })}
                            />
                            <p>{errors.email} {errors.emailnotfound}</p>
                        </label>
                        <label>
                            Password
                            <input
                                onChange={this.onChange}
                                value={this.state.password}
                                error={errors.password}
                                id={"password"}
                                type={"password"}
                                className={classnames("", {
                                    invalid: errors.password || errors.passwordincorrect
                                })}
                            />
                            <p>{errors.email} {errors.emailnotfound}</p>
                        </label>
                        <button
                            type={"submit"}
                            className={"btn"}
                        >
                            LOGIN
                        </button>
                    </form>
                </div>
            </section>
        )
    }
}

// const mapState = null
// const mapDispatch = null

const mapState = (state) => ({
    currentUser: state.authReducer.currentUser,
    isLoggedIn: state.authReducer.isLoggedIn
});

const mapDispatch = (dispatch) => ({
    login: data => {
        dispatch(login(data))
    }
});


export default connect(mapState, mapDispatch)(Login)
