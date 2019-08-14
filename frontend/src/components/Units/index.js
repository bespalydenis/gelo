import React, { Component } from 'react'
import axios from 'axios'
import {requestUsers} from "../../store/actions";
import connect from "react-redux/es/connect/connect";
import CreateUnit from './CreateUnit'

class Units extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            units: this.props.units,
            isLoading: false
        };

    }

    componentDidMount() {
        // axios.get('/api/users/units', this.props.userID )
        //     .then(res => {
        //         console.log('>> res', res.data);
        //     })
        //     .catch(err => {
        //         console.log('>> err', err);
        //     })
        this.props.requestUsers(this.props.userID);
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
            <div className={"unitsRow"}>
                <div className="wr">
                    <div className="tables">
                        <h2>Units</h2>
                        <div className="table">
                            {
                                (this.props.units || []).map((item) => {
                                    return <div className="table_row"><div className="table_line">{item.email}</div><div className="table_info">Rights: {item.rights}</div><a onClick={this.removeUnit}>Remove</a></div>;
                                })
                            }
                        </div>
                    </div>
                    <CreateUnit />
                </div>
            </div>
        )
    }
}

const mapState = state => ({
    units: state.authReducer.units,
    user: state.authReducer.user,
    userID: state.authReducer.userID
});

const mapDispatch = (dispatch) => ({
    requestUsers: data => {
        dispatch(requestUsers(data))
    }
});

export default connect(mapState, mapDispatch)(Units)