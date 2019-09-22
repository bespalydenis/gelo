import React from 'react'
// import { connect } from "react-redux";
import classnames from "classnames"
import { connect } from 'react-redux';
import {requestUsers, login} from "../../store/actions";
import axios from 'axios';
import './index.scss';
import { Link } from 'react-router-dom';
import * as icons from "../../assets";
import jwt_decode from 'jwt-decode';

class ResetPass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password1: '',
            password2: '',
            errors: {},
            isValidEmail: false,
            resetSecret: null,
            isPasswordShow1: false,
            isPasswordShow2: false,
            isValidPassword: {
                password1: false,
                password2: false
            },
            isUserExist: ['A user with this email does not exist. Try again', 'Enter your email to receive password reset link'],
            viewAfterSend: false,
            viewAfterReset: false,
            isPasswordsSame: 0
        }
    }

    componentDidMount() {
        if(this.props.match.params.secret) {
            console.log('>> secret decode', jwt_decode(this.props.match.params.secret));
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });

        function validateEmail(email) {
            let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        if(['password1', 'password2'].includes(e.target.id)) {
            if(this.state.isPasswordsSame === 1) {
                this.setState({
                    isPasswordsSame: 0
                });
            }
        }

        if(!this.props.match.params.secret) {
            if(validateEmail(this.state.email)) {
                this.setState({
                    isValidEmail: true,
                    errors: false
                });
            } else {
                this.setState({
                    isValidEmail: false,
                    errors: false
                });
            }
        } else {
            if(e.target.value.length < 6) {
                this.setState({
                    isValidPassword: {
                        ...this.state.isValidPassword,
                        [e.target.id]: false
                    }
                });
            } else if(e.target.value.length >= 6) {
                this.setState({
                    isValidPassword: {
                        ...this.state.isValidPassword,
                        [e.target.id]: true
                    }
                });
            }
        }
    };

    onSubmit = e => {
        e.preventDefault();
        console.log('>> #1');

        if (this.state.password1 === this.state.password2) {
            this.setState({
                isPasswordsSame: 2
            });
        } else {
            this.setState({
                isPasswordsSame: 1
            });
            return false;
        }

        if(this.props.match.params.secret) {
            const token = jwt_decode(this.props.match.params.secret);
            console.log('>> #2', token);

            axios.post('/api/users/setPassword', { email: token.email, password: this.state.password1 }).then(result => {
                if(result.status === 200) {
                    this.setState({
                        viewAfterReset: true
                    });
                }
            }).catch(error => console.log('>> error', error));
        } else {
            console.log('>> #3');
            axios.post('/api/users/reset', { email: this.state.email }).then(result => {
                console.log('>> #4');
                console.log('>> resetSecret', result);
                if(result.data === 'Success') {
                    this.setState({
                        viewAfterSend: true
                    });
                } else {
                    this.setState({
                        errors: {
                            email: 'error'
                        }
                    });
                }
            }).catch(error => {
                console.log('>>> e', error);
            });
        }
    };

    showPassword = (e) => {
        const index = e.target.closest('label').querySelector('input').id;
        if(index === 'password1') {
            this.setState({ isPasswordShow1: !this.state.isPasswordShow1 });
        } else if(index === 'password2') {
            this.setState({ isPasswordShow2: !this.state.isPasswordShow2 });
        }
    };

    handleSubmit = (e) => {
        console.log('>>>> e', e.target)
    };

    render() {
        const errors = this.state.errors;

        if(this.props.isLoggedIn)
            window.location.href = './';

        console.log('>>>>', this.state.isPasswordsSame);

        if(this.state.viewAfterSend) {
            return (
                <section className={"auth"}>
                    <div className="wr">
                        <div className="cols">
                            <div className="col col1">

                            </div>
                            <div className="col col2">
                                <div className="authForm">
                                    <div className="authForm_head">
                                        <div className="authForm_title">Email sent</div>
                                    </div>
                                    <div className="authWarning">
                                        <img src={icons.SUCCESS} alt="" className="authWarning_icon"/>
                                        <div className="col">
                                            <div className="authWarning_title">Success!</div>
                                            <p>We’ve sent an email to {this.state.email} with password<br/>
                                                reset instructions.</p>
                                        </div>
                                    </div>
                                    <p className={"authAfterWarning"}>If the email doesn’t show up soon, check your spam folder. We sent it from <br/>
                                        our.address@gmail.com</p>
                                    <Link to={'/login'} className={"btn btn-blue"}>Return to login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
        } else if (this.state.viewAfterReset) {
            return (
                <section className={"auth"}>
                    <div className="wr">
                        <div className="cols">
                            <div className="col col1">

                            </div>
                            <div className="col col2">
                                <div className="authForm">
                                    <div className="authForm_head">
                                        <div className="authForm_title">Reset password</div>
                                    </div>
                                    <div className="authWarning">
                                        <img src={icons.SUCCESS} alt="" className="authWarning_icon"/>
                                        <div className="col">
                                            <div className="authWarning_title">Success!</div>
                                            <p>Your password has been updated.</p>
                                        </div>
                                    </div>
                                    <Link to={'/login'} className={"btn btn-blue"}>Back to login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        } else {
            return (
                <section className={"auth"}>
                    <div className="wr">
                        <div className="cols">
                            <div className="col col1">

                            </div>
                            <div className="col col2">
                                <div className="authForm">
                                    <div className="authForm_head">
                                        <div className="authForm_title">Reset password</div>
                                        {
                                            !this.props.match.params.secret && !this.props.match.params.email &&
                                            <div className="authForm_info authForm_info-2">
                                                <a href="/login">Back to Login</a>
                                            </div>
                                        }
                                    </div>
                                    <form className={"authForm_body"} autocomplete="off" noValidate onSubmit={this.onSubmit}>
                                        {
                                            (!this.props.match.params.secret) ?
                                                <label>
                                                    <span>Email</span>
                                                    <input
                                                        onChange={this.onChange}
                                                        onKeyUp={this.onChange}
                                                        value={this.state.email}
                                                        error={errors && errors.email}
                                                        placeholder={"Your email"}
                                                        id={"email"}
                                                        type={"email"}
                                                        className={classnames("", {
                                                            invalid: errors && errors.email
                                                        })}
                                                    />
                                                    {
                                                        errors && errors.email ? <p className={"labelError"}>A user with this email does not exist. Try again
                                                        </p> : <p>Enter your email to receive password reset link</p>
                                                    }
                                                </label> : null
                                        }
                                        {
                                            this.props.match.params.secret && (
                                                <React.Fragment>

                                                    <label>
                                                        <span>New password</span>
                                                        <input
                                                            onChange={this.onChange}
                                                            value={this.state.password}
                                                            error={errors && errors.password}
                                                            id={"password1"}
                                                            placeholder={"Your new password"}
                                                            type={(this.state.isPasswordShow1) ? "text" : "password"}
                                                            className={classnames("", {
                                                                invalid: errors && errors.password
                                                            })}
                                                        />
                                                        {
                                                            errors && errors.password ? <p className={"labelError"}>Oops. That password isn't right. <a
                                                                href="" className={"link"}>Recover your password?</a></p> : null
                                                        }
                                                        <a href="javascript:void(0);" className={"showPassword"}>
                                                            <img src={icons.EYE} alt="" className="labelIcon" onClick={this.showPassword} />
                                                        </a>
                                                    </label>
                                                    <label>
                                                        <span>Confirm new password</span>
                                                        <input
                                                            onChange={this.onChange}
                                                            value={this.state.password2}
                                                            error={errors && errors.password2}
                                                            id={"password2"}
                                                            placeholder={"Confirm your new password"}
                                                            type={(this.state.isPasswordShow2) ? "text" : "password"}
                                                            className={classnames("", {
                                                                invalid: errors && errors.password
                                                            })}
                                                        />
                                                        {
                                                            this.state.isPasswordsSame === 1 ? <p className={"labelError"}>Passwords don't match. Try again</p> : null
                                                        }
                                                        <a href="javascript:void(0);" className={"showPassword"}>
                                                            <img src={icons.EYE} alt="" className="labelIcon" onClick={this.showPassword} />
                                                        </a>
                                                    </label>
                                                </React.Fragment>
                                            )
                                        }
                                        <button
                                            type={"submit"}
                                            className={
                                                this.props.match.params.secret
                                                    ? (this.state.isValidPassword.password1 && this.state.isValidPassword.password2) ? "btn btn-blue btn-continue" : "btn btn-continue btn-blue btn-disabled"
                                                    : this.state.isValidEmail ? "btn btn-blue btn-continue" : "btn btn-continue btn-blue btn-disabled"}
                                            disabled={this.props.match.params.secret ? false : !this.state.isValidEmail}
                                        >
                                            Reset password
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
    }
}

const mapState = (state) => ({
    currentUser: state.authReducer.currentUser,
    isLoggedIn: state.authReducer.isLoggedIn,
    userInfo: state.authReducer.user,
    errors: state.authReducer.errors,
});

const mapDispatch = (dispatch) => ({
    login: data => {
        dispatch(login(data))
    }
});


export default connect(mapState, mapDispatch)(ResetPass)
