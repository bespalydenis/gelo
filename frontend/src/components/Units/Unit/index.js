import React, { Component } from 'react'
import axios from 'axios'
import {requestUsers} from "../../../store/actions";
import connect from "react-redux/es/connect/connect";

class Unit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            units: this.props.units,
            isLoading: false
        };
    }

    componentDidMount = async() => {
        console.log('email', this.props.user.email);
    };

    // Change to saga
    removeUnit = (e) => {
        e.preventDefault();

        const email = { email: e.target.closest('.table_row').querySelector('.table_line').innerHTML };
        console.log('>> Email', email);

        axios.post('/api/users/remove/', email)
            .then(res => {
                console.log('>> Remove', res)
            })
            .catch(err => {
                console.log('>> Remove Email', err)
            });

        // TO-DO
        e.target.closest('.table_row').remove();
    };

    render(){
        console.log('>> Render Units', this.props.units);
        return (
            <div className="table_row">
                <div className="table_line">{this.props.email}</div>
                <a onClick={this.editUnit}>Edit</a>
                <a onClick={this.removeUnit}>Remove</a>
            </div>
        )
    }
}

// const mapState = state => ({
//     units: state.authReducer.units,
//     user: state.authReducer.user
// });
//
// const mapDispatch = (dispatch) => ({
//     requestUsers: data => {
//         dispatch(requestUsers(data))
//     }
// });

export default connect(null, null)(Unit)