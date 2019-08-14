import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {requestUsers} from "../../store/actions";
import connect from "react-redux/es/connect/connect";

class Register extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
        };

        axios.post('/api/users/register', newUser)
            .then(res => {
                console.log('>> Register 1',res);
                alert('Register Success!');
            })
            .catch(errors => {
                if (errors.response) {
                    // Request made and server responded
                    console.log('e',errors.response.data);
                    this.setState({
                        errors: errors.response.data
                    });
                } else if (errors.request) {
                    // The request was made but no response was received
                    console.log('E', errors.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', errors.message);
                }
            })
    };

    getUnits = e => {
      e.preventDefault();

      axios.get('/api/users/units', {})
          .then(res => {
              console.log('>> Get Units', res)
          })
          .catch(err => {
              console.log('>> Get Units', err.res)
          })
    };

    render() {

        if(this.props.isLoggedIn)
            window.location.href = './';

        return (
            <section className={"form"}>
                <div className="wr">
                    <h1>Registration</h1>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <label htmlFor="name">Name
                                {this.state.errors.name}
                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    id="name"
                                    type="text"
                                /></label>
                            </div>
                            <div className="input-field col s12">
                                <label htmlFor="email">Email
                                {this.state.errors.email}
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    id="email"
                                    type="email"
                                /></label>
                            </div>
                            <div className="input-field col s12">
                                <label htmlFor="password">Password
                                {this.state.errors.password}
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    id="password"
                                    type="password"
                                /></label>
                            </div>
                            <div className="input-field col s12">
                                <label htmlFor="password2">Confirm Password
                                {this.state.errors.password2}
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    id="password2"
                                    type="password"
                                /></label>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
            </section>
        );
    }
}
const mapState = state => ({
    errors: state.authReducer.errors,
    isLoggedIn: state.authReducer.isLoggedIn
});

const mapDispatch = (dispatch) => ({
    // requestUsers: data => {
    //     dispatch(requestUsers(data))
    // }
});

export default connect(mapState, mapDispatch)(Register)