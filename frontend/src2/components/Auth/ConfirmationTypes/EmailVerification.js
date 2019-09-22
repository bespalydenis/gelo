import React from 'react'
import { connect } from 'react-redux';
import {requestUsers, login, setUserStatus} from "../../../store/actions";
import * as icons from '../../../assets';
import '../index.scss';
import axios from 'axios';

class EmailVerification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userStatus: this.props.userStatus
        };
    }

    // async componentDidMount() {
    //     if(this.props.secret) {
    //         const secret = await axios.post('/api/users/secret', { email: this.props.user.email });
    //         if(secret.data === this.props.secret) {
    //             console.log('>> Same');
    //             this.props.setUserStatus( { id: this.props.user.id, status: 1 })
    //         } else {
    //             console.log('>> Not Same', secret.data);
    //         }
    //     }
    // }

    render() {
        return (
            <React.Fragment>
                <div className="authForm_head">
                    <div className="authForm_title">Check your email</div>
                </div>
                <div className="authWarning">
                    <img src={icons.SUCCESS} alt="" className="authWarning_icon"/>
                    <div className="col">
                        <div className="authWarning_title">Check your email!</div>
                        <p>We’ve sent an email to kosinov.zooom@gmail.com with link
                            <br/>to activate your account.</p>
                    </div>
                </div>
                <div className="authFooter authFooter-confirmation">
                    <p>If the email doesn’t show up soon, check your spam folder. We sent it from<br/>
                        <a>our.address@gmail.com</a></p>
                    <button className={"btn btn-blue"}>Didn’t get an email</button>
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


export default connect(mapState, mapDispatch)(EmailVerification)