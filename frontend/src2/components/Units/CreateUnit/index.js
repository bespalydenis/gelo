import React, { Component } from 'react'
import axios from 'axios'
import {requestUsers, addUser} from "../../../store/actions";
import connect from "react-redux/es/connect/connect";

class CreateUnit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: null,
            secondName: null,
            email: null,
            password: null,
            password2: null
        }
    }

    componentDidMount = async() => {
        this.setState({ isLoading: true });
    };

    setFirstName = (e) => {
      this.setState({
          firstName: e.target.value
      });
    };

    setSecondName = (e) => {
        this.setState({
            secondName: e.target.value
        });
    };

    setEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    };

    setPassword = (e) => {
        this.setState({
            password: e.target.value
        })
    };

    setConfirmPassword = (e) => {
        this.setState({
            password2: e.target.value
        })
    };

    createUnit = e => {
        e.preventDefault();
        const newUser = {
            name: `${this.state.firstName} ${this.state.secondName}`,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            level: 1,
            access: 1,
            rights: (this.props.units.length) ? 0 : 1,
            parent: (this.props.user.rights === 2) ? this.props.userID : this.props.user.parent
        };

        console.log('>> CreateUnit', newUser);

        this.props.addUser(newUser);
        if(this.props.user.parent && this.props.user.rights === 1) {
            this.props.requestUsers(this.props.user.parent);
        } else {
            this.props.requestUsers(this.props.userID);
        }

        // axios.post('/api/users/register', newUser)
        //     .then(res => {
        //         console.log('>> res', res);
        //
        //     })
        //     .catch(errors => {
        //         if (errors.response) {
        //             this.setState({
        //                 errors: errors.response.data
        //             });
        //         } else if (errors.request) {
        //             console.log('E', errors.request);
        //         } else {
        //             console.log('Error', errors.message);
        //         }
        //     })
    };


    render(){
        return (
            <div className="createUnit">
                <h2>Create New Unit</h2>
                <form action="" onSubmit={this.createUnit}>
                    <label>
                        First Name
                        <input type="text" onChange={this.setFirstName} />
                    </label>
                    <label>
                        Second Name
                        <input type="text" onChange={this.setSecondName} />
                    </label>
                    <label>
                        Email
                        <input type="text" onChange={this.setEmail} />
                    </label>
                    <label>
                        Password
                        <input type="text" onChange={this.setPassword} />
                    </label>
                    <label>
                        Confirm password
                        <input type="text" onChange={this.setConfirmPassword} />
                    </label>
                    <button className={"btn"} type={"submit"}>Create New Unit</button>
                </form>
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
    addUser: data => {
        dispatch(addUser(data))
    }
});

export default connect(mapState, mapDispatch)(CreateUnit)