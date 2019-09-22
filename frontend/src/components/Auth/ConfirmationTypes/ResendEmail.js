import React from 'react'
import { connect } from 'react-redux';
import {login, setUserStatus} from "../../../store/actions";
import * as icons from '../../../assets';
import '../index.scss';

class ResendEmail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userStatus: this.props.userStatus
        };
    }

    render() {
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
                    <button className={"btn btn-blue"}>Re-enter email</button>
                </div>
            </React.Fragment>
        )
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


export default connect(mapState, mapDispatch)(ResendEmail)