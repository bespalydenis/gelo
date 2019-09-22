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

        this.state = {
            userStatus: (this.props.user.length) ? this.props.user.status :  this.props.userStatus
        }
    }

    componentDidMount() {
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

        this.props.requestUserData(this.props.userID);

        console.log('>> CONFIRMATION', this.state.userStatus);
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
        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.login(userData);
    };

    defineActiveComponent = (status) => {
        if (status === 0) {
            return <EmailVerification secret={this.props.match.params.secret} />;
        } else if (status >= 1 && status <= 4) {
            return <StepsVerification />;
        } else {
            return null;
        }
    };

    render() {
        const errors = this.props.errors;
        console.log('>> User Status render', this.props.user.status);
        return (
            <section className={"auth"}>
                <div className="wr">
                    <div className="cols">
                        <div className="col col1">

                        </div>
                        <div className="col col2">
                            <div className="authForm">
                                {this.defineActiveComponent(this.state.userStatus)}
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
    errors: state.authReducer.errors,
    userID: state.authReducer.userID,
    userStatus: state.authReducer.userStatus
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