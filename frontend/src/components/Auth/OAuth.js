import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleLogin } from 'react-google-login';
import {connect} from "react-redux";
import axios from 'axios';



class OAath extends React.Component {
    render() {
        const responseGoogle = (response) => {
            let newUser = {
                first_name: response.profileObj.givenName,
                last_name: response.profileObj.familyName,
                email: response.profileObj.email,
                isGoogleAuth: true
            };

            axios.post('/api/users')
            console.log('>> newUser', response);
        };
        
        return (
            <GoogleLogin
                clientId="588274163618-8bl29h1f62m0hh4gv9dj2k9mg02acvuj.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        );
    }

}



export default connect(null)(OAath);