import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Home from './components/Home'
import Test from './components/Test'
import Login from './components/Auth/Login.js'
import Register from './components/Auth/Register.js'
import Confirmation from './components/Auth/Confirmation.js';
import Nav from './components/Nav'
import Units from './components/Units'
import setAuthToken from './utils/setAuthToken'
import connect from "react-redux/es/connect/connect";
import PrivateRoute from './utils/checkAuth';
import {getCurrentUserData, requestUserData} from './store/actions';
import jwt_decode from "jwt-decode";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            userStatus: (this.props.user.length) ? this.props.user.status :  this.props.userStatus
        };

        console.log('>>>dsdasd', this.state.userStatus);
    }

    componentDidMount() {
        this.props.requestUserData(this.props.userID);

        console.log('>> APP STATUS', this.state.userStatus);
    }

    render() {
        console.log(">> APP", this.state.userStatus);
        return (
            (!this.state.isLoggedIn) ? (
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
                        <PrivateRoute
                            path="/units"
                            component={Units}
                            isLoggedIn={this.props.isLoggedIn}
                            user={this.props.user}
                        />
                        <Route
                            path="/login"
                            component={Login}
                        />
                        <Route
                            path="/register"
                            component={Register}
                        />
                    </Switch>
                </React.Fragment>
            ) : (
                (this.state.userStatus < 5) ? (
                <React.Fragment>
                    <Switch>
                        <Route
                            path={"/confirmation/:secret"}
                            component={Confirmation}
                        />
                        <Route
                            path={"/confirmation"}
                            component={Confirmation}
                        />
                        <Redirect from="/*" to="/confirmation" component={Confirmation} />
                    </Switch>
                </React.Fragment> )
                    : (
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
                                <PrivateRoute
                                    path="/units"
                                    component={Units}
                                    isLoggedIn={this.props.isLoggedIn}
                                    user={this.props.user}
                                />
                            </Switch>
                        </React.Fragment>
                    )
            )
        )
    }
}

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