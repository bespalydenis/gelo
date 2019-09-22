import React from 'react'
// import { connect } from "react-redux";
import classnames from "classnames"
import { connect } from 'react-redux';
import setAuthToken from '../../utils/setAuthToken';
import jwt from 'jsonwebtoken';
import {requestUsers, login, requestUserData, setUserStatus} from "../../store/actions";
import EmailVerification from "./ConfirmationTypes/EmailVerification";
import StepsVerification from "./ConfirmationTypes/StepsVerification";
import axios from 'axios';
import './index.scss';

class Confirmation extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.requestUserData(this.props.userID);
    }

    defineActiveComponent = (status) => {
        if (status === 0) {
            return <EmailVerification secret={this.props.match.params.secret} />;
        } else if (status >= 1 && status <= 4) {
            console.log('>> defineActiveComponent', status);
            return <StepsVerification />;
        } else {
            window.location.href = '/';
        }
    };

    render() {
        const errors = this.props.errors;

        const params = this.props.match;
        console.log('>> match', params);

        if(this.props.match.params.secret) {
            const secret = axios.post('/api/users/secret', { email: this.props.user.email });
            console.log('>> Secret', secret.data, this.props.secret);
            if(secret.data === this.props.secret) {
                console.log('>> Same');
                this.props.setUserStatus( { id: this.props.userID, status: 1 })
            } else {
                console.log('>> Not Same', secret.data);
            }
        }

        return (
            <section className={"auth"}>
                <div className="wr">
                    <div className="cols">
                        <div className="col col1">

                        </div>
                        <div className="col col2">
                            <div className="authForm">
                                {this.defineActiveComponent( this.props.userStatus )}
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
    user: state.authReducer.user,
    userStatus: state.authReducer.userStatus,
    errors: state.authReducer.errors,
    userID: state.authReducer.userID
});

const mapDispatch = (dispatch) => ({
    login: data => {
        dispatch(login(data))
    },
    requestUserData: data => {
        dispatch(requestUserData(data))
    },
    setUserStatus: data => {
        dispatch(setUserStatus(data))
    }
});


export default connect(mapState, mapDispatch)(Confirmation)