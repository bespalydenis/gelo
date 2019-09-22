import React from 'react'
// import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import {requestUsers, logout} from "../../store/actions";

class Nav extends React.Component {
    handleClick = (e) => {
        e.preventDefault();

        console.log('>> logout');

        this.props.logout();
    };

    checkAuthClick = (e) => {
      if(this.props.user.rights < 1) {
          e.preventDefault();

          alert('Your rights is 0! Only for Account or Unit with editor rights.');
      }
    };

    render() {
        return (
            <nav className="nav">
                <div id="navmenu">
                    <ul>
                        <li className="nav-item">
                            <Link to={'/'} className="nav-link">Home</Link>
                        </li>
                        {
                            (this.props.isLoggedIn)
                            ? <li className="nav-item">
                                    <Link to={'/units'} className="nav-link" onClick={this.checkAuthClick}>Units</Link>
                                </li> : null
                        }

                    </ul>
                </div>
                {
                    (!this.props.isLoggedIn) ? <div id={"authMenu"}>
                        <Link to={"/login"}>Login</Link>
                        <Link to={"/register"}>Register</Link>
                    </div> : (<React.Fragment><p>Hello, {this.props.user.name}</p><a onClick={this.handleClick} className="btn">Logout</a></React.Fragment>)
                }

            </nav>
        )
    }
}

// const mapState = null
// const mapDispatch = null

const mapState = (state) => ({
    isLoggedIn: state.authReducer.isLoggedIn,
    user: state.authReducer.user
});

const mapDispatch = (dispatch) => ({
    logout: () => {
        dispatch(logout())
    }
});

export default connect(mapState, mapDispatch)(Nav)