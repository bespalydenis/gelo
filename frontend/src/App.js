import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home'
import Test from './components/Test'
import Login from './components/Auth/Login.js'
import Register from './components/Auth/Register.js'
import Nav from './components/Nav'
import Units from './components/Units'
import setAuthToken from './utils/setAuthToken'
import {requestUsers} from "./store/actions";
import connect from "react-redux/es/connect/connect";
import PrivateRoute from './utils/checkAuth';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Nav />

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
        )
    }
}

const mapState = state => ({
    user: state.authReducer.user,
    isLoggedIn: state.authReducer.isLoggedIn
});

const mapDispatch = (dispatch) => ({
});

export default connect(mapState, null)(App)