import React from 'react'
import {Link} from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import './style.css'

import { requestUsers, requestUserData } from "../../store/actions";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            units: this.props.units,
            isLoading: false,
            user: {
                email: this.props.user.email,
                name: this.props.user.name
            }
        }
    }

    componentDidMount = () => {
        this.setState({ isLoading: true });
        this.props.requestUserData(this.props.userID);
    };

    handleClick = (e) => {
        e.preventDefault();

        this.props.requestUsers('sdas');
    };

    render() {
        return (
            <section id={"landing"}>
                <div className="wr">
                    <h1>Landing page of app</h1>
                    {
                        !this.props.isLoggedIn ?
                            <div className="btns">
                                <Link to={"/login"} className={"btn"}>Login</Link>
                                <Link to={"/register"} className={"btn"}>Register</Link>
                            </div>
                            :
                            <React.Fragment>
                                <h2>Your Profile</h2>
                                <div className="tb">
                                    <div className="tb_line">
                                        <div>Email</div>
                                        <input type="text" value={this.state.user.email} />
                                    </div>
                                    <div className="tb_line">
                                        <div>Name</div>
                                        <input type="text" value={this.state.user.name} />
                                    </div>
                                    <div className="tb_line">
                                        <div>Email</div>
                                        <div>example@gmail.com</div>
                                    </div>
                                </div>
                                <a href="javascript:void(0);" className="btn" id="updateProfile">Update</a>
                            </React.Fragment>
                    }
                </div>
            </section>
        )
    }
}

const mapState = state => ({
    units: state.authReducer.units,
    user: state.authReducer.user,
    userID: state.authReducer.userID,
    isLoggedIn: state.authReducer.isLoggedIn
});

const mapDispatch = (dispatch) => ({
    // bindActionCreators({ requestUsers }, dispatch);
    requestUsers: data => {
        dispatch(requestUsers(data))
    },
    requestUserData: data => {
        dispatch(requestUserData(data))
    }
});

export default connect(mapState, mapDispatch)(Home)
