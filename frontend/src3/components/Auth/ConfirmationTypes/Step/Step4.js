import React from 'react'
import { connect } from 'react-redux';
import {setUserStatus} from "../../../../store/actions";
import '../../index.scss';
import Select from 'react-select'
import axios from 'axios';

class Step3 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userStatus: this.props.user.status,
            isAvailable: false || this.props.user.isAvailable,
        };
    }

    handleAvailable = (e) => {
        if (this.state.isAvailable) {
            this.setState({
                isAvailable: false
            });
        } else {
            this.setState({
                isAvailable: true
            });
        }
    };

    handleNextStep = (e) => {
        e.preventDefault();

        axios.post('/api/users/completeStep4', {id: this.props.userID, meta: this.state}).then(result => {
            window.location.href = '/';
        });
    };

    render() {

        return (
            <React.Fragment>
                <div className="authForm_head">
                    <div className="authForm_title">Personal settings</div>
                    <p className={"currentStep"}>Step 4 of 4</p>
                </div>
                <div className="authForm_body authForm_steps">
                    <label className={(this.state.isAvailable) ? "label-activs active" : "label-activs"} onClick={this.handleAvailable}>
                        <div className="activs">
                            <div className="activs-option"></div>
                        </div>
                        <div className="col">
                            <span>Set available</span>
                            <p>Let us know when you’re typically available to work</p>
                        </div>
                    </label>
                    <button
                        className={"btn btn-blue"}
                        onClick={this.handleNextStep}
                    >
                        Continue
                    </button>
                </div>
            </React.Fragment>
        )
    }
}

const mapState = (state) => ({
    currentUser: state.authReducer.currentUser,
    isLoggedIn: state.authReducer.isLoggedIn,
    user: state.authReducer.user,
    userID: state.authReducer.userID,
    errors: state.authReducer.errors
});

const mapDispatch = (dispatch) => ({
    setUserStatus: data => {
        dispatch(setUserStatus(data))
    }
});


export default connect(mapState, mapDispatch)(Step3)