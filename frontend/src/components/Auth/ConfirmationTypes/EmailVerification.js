import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {login, setUserStatus} from "../../../store/actions";
import * as icons from '../../../assets';
import '../index.scss';

class EmailVerification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userStatus: this.props.userStatus,
            isResendEmail: false
        };
    }

    setEmailResend = (e) => {
        e.preventDefault();

        this.setState({
            isResendEmail: !this.state.isResendEmail
        });
    };

    resendToEmail = (e) => {
        e.preventDefault();

        axios.post('/api/users/resendToEmail', { id: this.props.userID, email: this.props.user.email }).then(result => {
            this.setState({
                isResendEmail: !this.state.isResendEmail
            });
        });
    };

    render() {
        if (this.state.isResendEmail) {
            return (
                <React.Fragment>
                    <div className="authForm_head">
                        <div className="authForm_title">Didn’t get an email?</div>
                    </div>
                    <div className="authFooter authFooter-confirmation">
                        <p style={{ fontWeight: '600' }}>If you don’t see an email from us within a few minutes, a few things could
                            have happened:</p>
                        <ul>
                            <li>- The email is in your spam folder;</li>
                            <li>- The email address you entered had a mistake or typo;</li>
                            <li>- You accidentally gave us another email address;</li>
                            <li>- We can’t deliver the email to this address.</li>
                        </ul>
                        <button className={"btn btn-blue"} onClick={this.resendToEmail}>Re-enter email</button>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div className="authForm_head">
                        <div className="authForm_title">Check your email</div>
                    </div>
                    <div className="authWarning">
                        <img src={icons.SUCCESS} alt="" className="authWarning_icon"/>
                        <div className="col">
                            <div className="authWarning_title">Check your email!</div>
                            <p>We’ve sent an email to {this.props.user.email} with link
                                <br/>to activate your account.</p>
                        </div>
                    </div>
                    <div className="authFooter authFooter-confirmation">
                        <p>If the email doesn’t show up soon, check your spam folder. We sent it from<br/>
                            <a>our.address@gmail.com</a></p>
                        <button className={"btn btn-blue"} onClick={this.setEmailResend}>Didn’t get an email</button>
                    </div>
                </React.Fragment>
            );
        }
    }
}

const mapState = (state) => ({
    currentUser: state.authReducer.currentUser,
    isLoggedIn: state.authReducer.isLoggedIn,
    user: state.authReducer.user,
    userStatus: state.authReducer.userStatus,
    errors: state.authReducer.errors
});

const mapDispatch = (dispatch) => ({
    login: data => {
        dispatch(login(data))
    },
    setUserStatus: data => {
        dispatch(setUserStatus(data))
    }
});


export default connect(mapState, mapDispatch)(EmailVerification)