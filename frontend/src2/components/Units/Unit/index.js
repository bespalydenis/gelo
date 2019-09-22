import React, { Component } from 'react'
import axios from 'axios'
import {requestUsers, updateUser} from "../../../store/actions";
import connect from "react-redux/es/connect/connect";

class Unit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            units: this.props.units,
            isLoading: false,
            name: this.props.item.name,
            rights: this.props.item.rights
        };
    };

    changeName = (e) => {
        e.preventDefault();

        this.setState({
            name: e.target.value
        });
    };

    changeRights = (e) => {
        e.preventDefault();

        this.setState({
            rights: e.target.value
        });
    };

    removeUnit = (e) => {
        e.preventDefault();

        const email = { email: e.target.closest('.table_row').querySelector('.table_line').innerHTML };

        axios.post('/api/users/remove/', email)
            .then(res => {
                console.log('>> Remove', res)
            })
            .catch(err => {
                console.log('>> Remove Email', err)
            });

        // TO-DO
        e.target.closest('.table').remove();
    };

    handleClick = (e) => {
        e.preventDefault();

        this.props.updateUser({
            meta: {
                name: this.state.name,
                rights: this.state.rights
            },
            userID: this.props.item._id
        });
    };

    render(){
        return (
            <React.Fragment>
                <div className="table">
                    <div className="table_row">
                        <div className="table_line">{this.props.item.email}</div>
                        <div className="table_info">Rights: {this.props.item.rights}</div>
                        <a onClick={this.removeUnit}>Remove</a>
                        <a onClick={this.handleClick} className="btn">Save changes</a>
                    </div>
                    <div className="table_details">
                        <div className="table_col">
                            Name
                            <input type="text" value={this.state.name} onChange={this.changeName} />
                        </div>
                        <div className="table_col">
                            Rights
                            <select value={this.state.rights} onChange={this.changeRights}>
                                <option value='0'>Without rights</option>
                                <option value='1'>Editor</option>
                            </select>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapState = state => ({
    units: state.authReducer.units,
    user: state.authReducer.user,
    userID: state.authReducer.userID
});

const mapDispatch = (dispatch) => ({
    updateUser: data => {
        dispatch(updateUser(data))
    }
});

export default connect(mapState, mapDispatch)(Unit)