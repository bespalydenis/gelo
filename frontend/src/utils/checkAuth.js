import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props => (
                rest.isLoggedIn ? ( <Component {...props} /> ) : <Redirect to={'/login'}/> )
            }
        />
    );
};

//( <Redirect to={{ pathname: '/login', state: {from: props.location} }} /> )