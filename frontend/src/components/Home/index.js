import React from 'react'
import {Link} from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import './style.css'

import { requestUsers, requestUserData, logout } from "../../store/actions";

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
        //this.props.requestUserData(this.props.userID);
    };

    handleClick = (e) => {
        e.preventDefault();

        this.props.requestUsers('sdas');
    };

    setLogout = () => {
        this.props.logout()
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
                               <button className={"btn"} onClick={this.setLogout}>Logout</button>
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
    },
    logout: data => {
        dispatch(logout(data))
    }
});

export default connect(mapState, mapDispatch)(Home)
