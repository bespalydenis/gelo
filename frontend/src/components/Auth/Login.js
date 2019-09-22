import React from 'react'
// import { connect } from "react-redux";
import classnames from "classnames"
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken';
import jwt from 'jsonwebtoken';
import {requestUsers, login} from "../../store/actions";
import * as icons from '../../assets';
import './index.scss';
import {GoogleLogin} from "react-google-login";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {},
            isValidEmail: false,
            isPasswordShow: false,
            isKeepLogged: false,
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        if(validateEmail(this.state.email)) {
            this.setState({
                isValidEmail: true,
                errors: {}
            });
        } else {
            this.setState({
                isValidEmail: false,
                errors: {}
            });
        }
    };

    onSubmit = e => {
      e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.login(userData);
    };

    showPassword = (e) => {
        this.setState({ isPasswordShow: !this.state.isPasswordShow });
    };

    setKeepLogged = (e) => {
        this.setState({ isKeepLogged: !this.state.isKeepLogged });
        console.log('>>', this.state.isKeepLogged);
    };

    responseGoogle = (response) => {
        const userInfo = {
            email: response.profileObj.email,
            isGoogleAuth: true,
            password: null
        };

        this.props.login(userInfo);
    };

    render() {
        const errors = this.props.errors;

        if(this.props.isLoggedIn)
            window.location.href = './';

        return (
            <section className={"auth"}>
                <div className="wr">
                    <div className="cols">
                        <div className="col col1">

                        </div>
                        <div className="col col2">
                            <div className="authForm">
                                <div className="authForm_head">
                                    <div className="authForm_title">Log In</div>
                                    <div className="authForm_info">
                                        <p>Don't have an account?</p>
                                        <Link to={"/register"}>Sign Up!</Link>
                                    </div>
                                </div>

                                <form className={"authForm_body"} autocomplete="on" noValidate onSubmit={this.onSubmit}>
                                    <label>
                                        <span>Email</span>
                                        <input
                                            onChange={this.onChange}
                                            onKeyUp={this.onChange}
                                            value={this.state.email}
                                            error={errors && errors.email}
                                            placeholder={"Your working email"}
                                            onClick={this.onChange}
                                            id={"email"}
                                            type={"email"}
                                            className={classnames("", {
                                                invalid: errors && errors.email
                                            })}
                                        />
                                        {
                                            errors && errors.email ? <p className={"labelError"}>Email not found</p> : null
                                        }
                                    </label>
                                    <label>
                                        <span>Password</span>
                                        <input
                                            onChange={this.onChange}
                                            onKeyUp={this.onChange}
                                            value={this.state.password}
                                            error={errors && errors.password}
                                            id={"password"}
                                            placeholder={"I know, it's our secret"}
                                            type={(this.state.isPasswordShow) ? "text" : "password"}
                                            className={classnames("", {
                                                invalid: errors && errors.password
                                            })}
                                        />
                                        {
                                            errors && errors.password ? <p className={"labelError"}>Oops. That password isn't right. <a
                                                href="/reset" className={"link"}>Recover your password?</a></p> : null
                                        }
                                        <a href="javascript:void(0);" className={"showPassword"} onClick={this.showPassword}>
                                            <img src={icons.EYE} alt="" className="labelIcon"/>
                                        </a>
                                    </label>
                                    <div className="authForm_checkinfo">
                                        <label>
                                            <div className="checkbox"
                                                style={{
                                                    background: `url(${(this.state.isKeepLogged) ? icons.CHECKBOX_ON : icons.CHECKBOX})`
                                                }}
                                            ></div>
                                            <input type="checkbox" onClick={this.setKeepLogged}/>
                                            <span>Keep me logged in</span>
                                        </label>
                                        <a href="/reset" className="link">Forgot a password?</a>
                                    </div>
                                    <button
                                        type={"submit"}
                                        className={this.state.isValidEmail ? "btn btn-blue" : "btn btn-blue btn-disabled"}
                                        disabled={!this.state.isValidEmail}

                                    >
                                        Login
                                    </button>
                                    <GoogleLogin
                                        clientId="588274163618-8bl29h1f62m0hh4gv9dj2k9mg02acvuj.apps.googleusercontent.com"
                                        buttonText="Login with Google"
                                        onSuccess={this.responseGoogle}
                                        onFailure={this.responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        className={"btn btn-google"}
                                    >
                                        <img src={icons.GOOGLE} alt=""/>
                                        Login with Google
                                    </GoogleLogin>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapState = (state) => ({
    currentUser: state.authReducer.currentUser,
    isLoggedIn: state.authReducer.isLoggedIn,
    userInfo: state.authReducer.user,
    errors: state.authReducer.errors
});

const mapDispatch = (dispatch) => ({
    login: data => {
        dispatch(login(data))
    }
});


export default connect(mapState, mapDispatch)(Login)
