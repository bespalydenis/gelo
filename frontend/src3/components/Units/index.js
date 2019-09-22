import React, { Component } from 'react'
import axios from 'axios'
import {requestUsers,updateUser} from "../../store/actions";
import connect from "react-redux/es/connect/connect";
import CreateUnit from './CreateUnit';
import Unit from './Unit';

class Units extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            units: this.props.units,
            isLoading: false
        };

    }

    componentDidMount() {
        if(this.props.user.parent && this.props.user.rights === 1) {
            this.props.requestUsers(this.props.user.parent);
        } else {
            this.props.requestUsers(this.props.userID);
        }
    };


    updateUser = (e) => {
        e.preventDefault();
    };

    render(){
        console.log('>> Parent', this.props.userID, this.props.user.rights);
        console.log('>> Render Units', this.props.units);
        return (
            <div className={"unitsRow"}>
                <div className="wr">
                    <div className="tables">
                        <h2>Units</h2>
                            {
                                (this.props.units) ?
                                    (this.props.units).map((item) => {
                                        return (
                                            <Unit item={item} />
                                        );
                                    })
                                    : <p>Empty!</p>
                            }
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
    },
    updateUser: data => {
        dispatch(updateUser(data))
    }
});

export default connect(mapState, mapDispatch)(Units)