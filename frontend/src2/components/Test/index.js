import React, { Component } from 'react'
// import { connect } from "react-redux";
// import request from 'superagent'
import axios from 'axios';
import {getUsers} from "../../store/actions";
import { connect } from 'react-redux';

class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            test: ''
        }
    }

    handleTest = (e) => {
        this.setState({
            test: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const data = this.state;

        console.log('>>', data);

        axios.post('/api/test', data)
            .then(function(response){
                console.log('>> resp', response)
            })
            .catch(function (error) {
                console.log(error);
            })

        // request
        //     .post('/api/test')
        //     .send(data)
        //     .set('Accept', 'application/json')
        //     .end((err, res) => {
        //         if(err || !res.ok) {
        //             console.log('Oh no! err', res)
        //         } else {
        //             console.log('Success')
        //         }
        //     });
        // console.log('v - 1');

    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text"
                           onChange={this.handleTest}
                           value={this.state.test}
                    />
                    <button type={"Submit"} value={"submit"}>Submit</button>
                </form>
            </div>
        )
    }
}

// const mapState = null
// const mapDispatch = null

// const mapDispatch = {
//   getUsers: getUsers
// };

export default connect(null, null)(Test)
