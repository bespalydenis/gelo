import React from 'react'
import {Link} from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import './style.css'

import { requestUsers } from "../../store/actions";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            units: this.props.units,
            isLoading: false
        }
    }

    componentDidMount = async() => {
        this.setState({ isLoading: true });
        this.props.requestUsers('sdas');
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
                        this.props.isLoggedIn ? null :
                            <div className="btns">
                                <Link to={"/login"} className={"btn"}>Login</Link>
                                <Link to={"/register"} className={"btn"}>Register</Link>
                            </div>
                    }
                </div>
            </section>
        )
    }
}

const mapState = state => ({
    units: state.authReducer.units,
    isLoggedIn: state.authReducer.isLoggedIn
});

const mapDispatch = (dispatch) => ({
    // bindActionCreators({ requestUsers }, dispatch);
    requestUsers: data => {
        dispatch(requestUsers(data))
    }
});

export default connect(mapState, mapDispatch)(Home)
