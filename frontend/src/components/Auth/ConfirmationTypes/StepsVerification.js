import React from 'react'
import { connect } from 'react-redux';
import {login, setUserStatus, receiveUserData, requestUserData} from "../../../store/actions";
import * as icons from '../../../assets';
import '../index.scss';
import Step1 from  './Step/Step1';
import Step2 from  './Step/Step2';
import Step3 from  './Step/Step3';
import Step4 from  './Step/Step4';
import Select from 'react-select'

class EmailVerification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userStatus: this.props.userStatus,
            isAvailable: '' || this.props.user.isAvailable
        };
    }

    componentDidMount() {
        this.props.requestUserData(this.props.userID);
    }

    render() {
        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
        ];

        console.log(">> DATA INFO", this.props.user);

        const customStyles = {
            option: (provided, { data, isDisabled, isSelected, isFocused }) => ({
                ...provided,
                height: 40,
                backgroundColor: isDisabled
                    ? null
                    : isSelected
                        ? '#F4F8FF'
                        : null,
                color: isSelected ? '#162B5B' : isFocused ? '#3260CC' : '#162B5B',
                paddingLeft: 19,
                paddingRight: 19,
            }),
            valueContainer: (provided) => ({
                ...provided,
                height: 52,
                fontSize: 16,
                paddingLeft: 19,
                paddingRight: 19,
                borderColor: '#CCD3E3'
            }),
            container: (provided) => ({
                ...provided,
                fontSize: 16,
                borderColor: '#CCD3E3'
            }),
            control: (provided) => ({
                ...provided,
                borderColor: '#CCD3E3',
            })
        };

        switch (this.props.user.status) {
            case 1:
                return <Step1 user={this.props.user} />;
            case 2:
                return <Step2 user={this.props.user} />;
            case 3:
                return <Step3 />;
            case 4:
                return <Step4 />;
            default:
                return <h1>Next?</h1>;
        }
    }
}

const mapState = (state) => ({
    currentUser: state.authReducer.currentUser,
    isLoggedIn: state.authReducer.isLoggedIn,
    user: state.authReducer.user,
    errors: state.authReducer.errors,
    userStatus: state.authReducer.userStatus
});

const mapDispatch = (dispatch) => ({
    login: data => {
        dispatch(login(data))
    },
    setUserStatus: data => {
        dispatch(setUserStatus(data))
    },
    requestUserData: data => {
        dispatch(requestUserData(data))
    }
});


export default connect(mapState, mapDispatch)(EmailVerification)