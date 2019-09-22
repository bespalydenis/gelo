/* eslint-disable */

import React, { Component } from "react";
import { connect } from 'react-redux';
import * as icons from '../../assets';
import './index.scss';
import classnames from "classnames";
import {addUser} from "../../store/actions";

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            errors: {},
            isPasswordShow: false
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        if(validateEmail(this.state.email)) {
            this.setState({
                isValidEmail: true
            });
        } else {
            this.setState({
                isValidEmail: false
            });
        }
    };

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            rights: 2,
            status: 0
        };

        this.props.addUser(newUser);
    };

    getUnits = e => {
      e.preventDefault();

      // axios.get('/api/users/units', {})
      //     .then(res => {
      //         console.log('>> Get Units', res)
      //     })
      //     .catch(err => {
      //         console.log('>> Get Units', err.res)
      //     })
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
                                    <div className="authForm_title">Sign Up</div>
                                    <div className="authForm_info">
                                        <p>Already have an account?</p>
                                        <a href="">Login!</a>
                                    </div>
                                </div>
                                <form className={"authForm_body"} noValidate onSubmit={this.onSubmit}>
                                    <label className={"label50 label50-left"}>
                                        <span>First name</span>
                                        <input type="text"
                                               onChange={this.onChange}
                                               value={this.state.firstName}
                                               placeholder={"Your first name"}
                                               id={"firstName"}
                                               className={classnames("", {
                                                   invalid: errors && errors.firstName
                                               })}
                                        />
                                        {
                                            errors && errors.firstName ? <p className={"labelError"}>Email not found</p> : null
                                        }
                                    </label>
                                    <label className={"label50 label50-right"}>
                                        <span>Last name</span>
                                        <input type="text"
                                               onChange={this.onChange}
                                               value={this.state.lastName}
                                               placeholder={"Your last name"}
                                               id={"lastName"}
                                               className={classnames("", {
                                                   invalid: errors && errors.lastName
                                               })}
                                        />
                                        {
                                            errors && errors.lastName ? <p className={"labelError"}>Email not found</p> : null
                                        }
                                    </label>
                                    <label>
                                        <span>Email</span>
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.email}
                                            error={errors && errors.email}
                                            placeholder={"Your working email"}
                                            id={"email"}
                                            type={"email"}
                                            className={classnames("", {
                                                invalid: errors && errors.email
                                            })}
                                        />
                                        {
                                            errors && errors.email ? <p className={"labelError"}>That address is already in use. <a>Log in</a></p> : <p className={"labelInfo"}>We'll sent confirmation link on this address</p>
                                        }
                                    </label>
                                    <label>
                                        <span>Password</span>
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.password}
                                            error={errors && errors.password}
                                            id={"password"}
                                            placeholder={"I know, it's our secret"}
                                            type={(this.state.isPasswordShow ? 'text' : 'password')}
                                            className={classnames("", {
                                                invalid: errors && errors.password
                                            })}
                                        />
                                        {
                                            errors && errors.password ? <p className={"labelError"}>Oops. That password isn't right. <a
                                                href="" className={"link"}>Recover your password?</a></p> : null
                                        }
                                        <a href="javascript:void(0);">
                                            <img src={icons.EYE} alt="" className="labelIcon" onClick={this.setState({ isPasswordShow: !this.state.isPasswordShow })}/>
                                        </a>
                                    </label>
                                    <div className="authForm_checkinfo authForm_checkinfo-register">
                                        <p>By clicking ‘’Continue’’ I agree to Service name <a>Terms of Use</a> and <a>Privacy Policy</a></p>
                                    </div>
                                    <button
                                        type={"submit"}
                                        className={this.state.isValidEmail ? "btn btn-blue" : "btn btn-blue btn-disabled"}
                                        disabled={!this.state.isValidEmail}
                                    >
                                        Continue
                                    </button>
                                    <button className="btn btn-google">
                                        <img src={icons.GOOGLE} alt=""/>
                                        Sign up with Google
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );

    }
}

const mapState = (state) => ({
    currentUser: state.authReducer.currentUser,
    isLoggedIn: state.authReducer.isLoggedIn,
    userInfo: state.authReducer.user,
    errors: state.authReducer.errors
});

const mapDispatch = (dispatch) => ({
    addUser: data => {
        dispatch(addUser(data))
    }
});

export default connect(mapState, mapDispatch)(Register)