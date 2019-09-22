import React from 'react'
import { connect } from 'react-redux';
import {login, setUserStatus, receiveUserData} from "../../../store/actions";
import * as icons from '../../../assets';
import '../index.scss';
import Step1 from  './Step/Step1';
import Step2 from  './Step/Step2';
import Select from 'react-select'
import Step3 from "./Step/Step3";
import Step4 from "./Step/Step4";

class EmailVerification extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userStatus: this.props.user.status,
            profilePhoto: ''
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    callUserData = () => {
        this.props.receiveUserData(this.props.userID);
    };

    setProfilePhoto = (e) => {
        e.preventDefault();

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        let reader = new FileReader();
        console.log('>> reader', reader);
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.saveResults = (imageResult) => {
            this.setState({
                profilePhoto: imageResult
            });
        };

        async function covertToBase64() {
            await toBase64(file).then(result => {
                reader.saveResults(result)
            });
        };

        covertToBase64();
    };

    handleNextStep = (e) => {
        e.preventDefault();
    };

    render() {
        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
        ];

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
                return <Step1 callUserData={this.callUserData} />;
            case 2:
                return <Step2 />;
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
    errors: state.authReducer.errors
});

const mapDispatch = (dispatch) => ({
    login: data => {
        dispatch(login(data))
    },
    setUserStatus: data => {
        dispatch(setUserStatus(data))
    },
    receiveUserData: data => {
        dispatch(receiveUserData(data))
    }
});


export default connect(mapState, mapDispatch)(EmailVerification)