import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from './components/Home'
import Test from './components/Test'
import Login from './components/Auth/Login.js'
import Register from './components/Auth/Register.js'
import Confirmation from './components/Auth/Confirmation.js';
import ResendEmail from './components/Auth/ConfirmationTypes/ResendEmail';
import Nav from './components/Nav'
import setAuthToken from './utils/setAuthToken'
import connect from "react-redux/es/connect/connect";
import PrivateRoute from './utils/checkAuth';
import {getCurrentUserData, requestUsers, requestUserData} from './store/actions';
import jwt_decode from "jwt-decode";
import ResetPass from "./components/Auth/ResetPass";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            userStatus: null
        };

        console.log(">> APP C", this.props.userStatus);
    }

    componentDidMount() {
        if(this.props.isLoggedIn)
            this.props.requestUserData(this.props.userID);
    }

    componentWillMount() {
        // console.log('>> APP WM', this.props.userStatus);
        // this.props.receiveUserData(this.props.userID);
    }

    render() {
        // if(this.props.userStatus !== null && this.props.userStatus !== undefined && this.props.userStatus < 5) {
        //     window.location.href = '/confirmation';
        // }

        if (this.props.isLoggedIn) {
            return (
                <React.Fragment>
                    <Switch>
                        <Route
                            path="/test"
                            component={Test}
                        />


                        <Route
                            path="/reset/:secret"
                            component={ResetPass}
                        />

                        <Route path="/confirmation/:secret" component={Confirmation} />
                        {
                            (this.props.userStatus !== null && this.props.userStatus !== undefined && this.props.userStatus < 5)
                                ?
                                (
                                    <React.Fragment>
                                        <Route path="/confirmation" component={Confirmation} />
                                        <Route path="/confirmation/reset-email" isResendEmail={true} component={ResendEmail} />
                                        <Redirect from="/" to="/confirmation" component={Confirmation} />
                                    </React.Fragment>
                                )
                                :
                                (
                                    <React.Fragment>
                                        <Route
                                            path="/"
                                            exact
                                            component={Home}
                                        />
                                        <Redirect from="/*" to="/" component={Home} />
                                    </React.Fragment>
                                )
                        }

                    </Switch>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Switch>
                        <Route
                            path="/"
                            exact
                            component={Home}
                        />
                        <Route
                            path="/test"
                            component={Test}
                        />
                        <Route
                            path="/login"
                            component={Login}
                        />

                        <Route
                            path="/reset/:secret?/"
                            component={ResetPass}
                        />

                        <Route
                            path="/register"
                            component={Register}
                        />
                        <Redirect to='/' />
                    </Switch>
                </React.Fragment>
            )
        }
    }
}

// <Redirect from="/old-match" to="/will-match" />
//<PrivateRoute
//    path="/units"
//    component={Units}
//    isLoggedIn={this.props.isLoggedIn}
//    user={this.props.user}
///>


const mapState = state => ({
    user: state.authReducer.user,
    userID: state.authReducer.userID,
    isLoggedIn: state.authReducer.isLoggedIn,
    userStatus: state.authReducer.userStatus
});

const mapDispatch = (dispatch) => ({
    getCurrentUserData: data => dispatch(getCurrentUserData(data)),
    requestUserData: data => dispatch(requestUserData(data))
});

export default connect(mapState, mapDispatch)(App)