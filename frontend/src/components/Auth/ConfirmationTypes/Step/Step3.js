import React from 'react'
import { connect } from 'react-redux';
import {login, setUserStatus, requestUserData} from "../../../../store/actions";
import * as icons from '../../../../assets';
import '../../index.scss';
import Select from 'react-select'
import axios from "axios";
import InputElement from 'react-input-mask';

class Step3 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userStatus: this.props.user.status,
            personalPhoto: null || this.props.user.personalPhoto,
            gender: 'm' && this.props.user.gender,
            birthMonth: '' && this.props.user.birthMonth,
            birthDay: '' && this.props.user.birthDay,
            birthYear: '' && this.props.user.birthYear,
            jobTitle: '' && this.props.user.jobTitle,
            bio: '' && this.props.user.bio
        };
    }

    onChange = (e) => {
        if(e.target.value.length > 2 || e.target.value > 31 || e.target.value[0] == 0) return false;

        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleNextStep = (e) => {
        e.preventDefault();
        console.log('>> to the 4th', this.state);

        axios.post('/api/users/completeStep3', {id: this.props.userID, meta: this.state}).then(result => {
            console.log('>> completeStep2', result);
            this.props.setUserStatus({ id: this.props.userID, status: 4 });
        }).catch(error => {
            console.log('>> error', error);
        });
    };

    changeGender = (e) => {
        const gender = e.target.closest('.cCheckbox').dataset.gender;

        if(gender === 'm' || gender === 'f' || gender === 'o')
            this.setState({ gender: gender });
    };

    setMonth = (selected) => {
        this.setState({ birthMonth: selected.value });
    };

    setPersonalPhoto = (e) => {
        e.preventDefault();

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.saveResults = (imageResult) => {
            this.setState({
                personalPhoto: imageResult
            });
        };

        async function covertToBase64() {
            await toBase64(file).then(result => {
                reader.saveResults(result)
            });
        };

        covertToBase64();
    };

    removePersonalPhoto = (e) => {
        this.setState({
            personalPhoto: null
        });
    };

    skipSteps = (e) => {
        e.preventDefault();

        this.props.setUserStatus({
            id: this.props.userID,
            status: 5
        })
    };

    prevStep = (e) => {
        e.preventDefault();

        this.props.setUserStatus({
            id: this.props.userID,
            status: this.props.user.status - 1
        })
    };

    render() {
        const optionsMonth = [
            { value: '1', label: 'January' },
            { value: '2', label: 'February' },
            { value: '3', label: 'March' },
            { value: '4', label: 'April' },
            { value: '5', label: 'May' },
            { value: '6', label: 'June' },
            { value: '7', label: 'July' },
            { value: '8', label: 'August' },
            { value: '9', label: 'September' },
            { value: '10', label: 'October' },
            { value: '11', label: 'November' },
            { value: '12', label: 'November' }
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
                height: 50,
                fontSize: 16,
                paddingLeft: 19,
                paddingRight: 19,
                borderColor: '#CCD3E3'
            }),
            container: (provided) => ({
                ...provided,
                fontSize: 16,
                border: 'none !important',
                borderColor: '#CCD3E3'
            }),
            control: (provided) => ({
                ...provided,
                borderBottom: '1px solid #CCD3E3 !important',
                borderLeft: '1px solid #CCD3E3 !important',
                borderTop: '1px solid #CCD3E3 !important',
                borderRight: '1px solid #CCD3E3 !important',
            }),
            dropdownIndicator: (provided) => ({
                ...provided,
                padding: 0,
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }),
            indicatorsContainer: (provided) => ({
                ...provided,
                width: 29,
                position: 'relative',
                right: 1,
                borderLeft: '1px solid #CCD3E3',
                backgroundColor: '#f5f6f9',
                borderRadius: '0 4px 4px 0'
            }),
            indicatorSeparator: (provided) => ({
                ...provided,
                display: 'none !important'
            }),
            input: (provided) => ({
                ...provided,
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                padding: 0,
                margin: 0
            })
        };
        return (
            <React.Fragment>
                <div className="authForm_head">
                    <div className="authForm_title">Personal details</div>
                    <p className={"currentStep"}>Step 3 of 4</p>
                </div>
                <div className="authForm_body authForm_steps">
                    <div className="authStep">
                        <div className="authStep_loadImage authStep_loadImage-step">
                            <div className="authStep_image" style={{
                                background: `url(${this.state.personalPhoto})`
                            }}></div>
                            {
                                (!this.state.personalPhoto)
                                    ? (
                                        <a href="javascript:void(0);" className={"btn btn-blue btn-empty btn-loadFile"}>
                                            <span>Upload image</span>
                                            <input type="file" onChange={this.setPersonalPhoto}/>
                                        </a>
                                    )
                                    : (
                                        <React.Fragment>
                                            <a href="javascript:void(0);" className={"btn btn-blue btn-empty btn-loadFile"}>
                                                <span>Change image</span>
                                                <input type="file" onChange={this.setPersonalPhoto}/>
                                            </a>
                                            <a href="javascript:void(0);" className={"link link-delete"} onClick={this.removePersonalPhoto}>Delete image</a>
                                        </React.Fragment>
                                    )
                            }

                        </div>
                    </div>
                    <label className={"label-cCheckboxes label-cCheckboxes3"}>
                        <span>Gender</span>
                        <div className="row">
                            <div data-gender={"m"} className={(this.state.gender === 'm') ? "cCheckbox cCheckbox-active" : "cCheckbox"}
                                 onClick={this.changeGender}
                            >
                                <div className="cCheckbox_input"></div>
                                <p>Male</p>
                            </div>
                            <div data-gender={"f"} className={(this.state.gender === 'f') ? "cCheckbox cCheckbox-active" : "cCheckbox"}
                                 onClick={this.changeGender}
                            >
                                <div className="cCheckbox_input"></div>
                                <p>Female</p>
                            </div>
                            <div data-gender={"o"} className={(this.state.gender === 'o') ? "cCheckbox cCheckbox-active" : "cCheckbox"}
                                 onClick={this.changeGender}
                            >
                                <div className="cCheckbox_input"></div>
                                <p>Other</p>
                            </div>
                        </div>
                    </label>
                    <label className={"label-cols"}>
                        <div className="col">
                            <span>Month of birth</span>
                            <Select
                                options={optionsMonth}
                                onChange={this.setMonth}
                                styles={customStyles}
                            />
                        </div>
                        <div className="col">
                            <span>Day</span>
                            <input type="number"
                                   max={31}
                                   min={0}
                                placeholder={"Example: 31"}
                               id={"birthDay"}
                               onChange={this.onChange}
                               value={this.state.birthDay}
                            />
                        </div>
                        <div className="col">
                            <span>Year</span>
                            <input type="text"
                                   placeholder={"Example: 1990"}
                               id={"birthYear"}
                               onChange={this.onChange}
                               value={this.state.birthYear}
                            />
                        </div>
                    </label>
                    <label className={""}>
                        <span>Job title</span>
                        <input
                            onChange={this.onChange}
                            placeholder={"Example: Doctor of Medicine in Physiotherapy"}
                            type={"text"}
                            id={"jobTitle"}
                            onChange={this.onChange}
                            value={this.state.jobTitle}
                        />
                    </label>
                    <label className={"labelTextarea"}>
                        <span>Bio</span>
                        <textarea
                            id={"bio"}
                            value={this.state.bio}
                            onChange={this.onChange}
                        />
                    </label>
                    <button
                        className={"btn btn-blue"}
                        onClick={this.handleNextStep}
                    >
                        Continue
                    </button>
                    <div className="stepActions">
                        <a className="stepActions_prev"
                           onClick={this.prevStep}
                        >Back to previous step</a>
                        <a className="stepActions_skip"
                           onClick={this.skipSteps}
                        >Skip all steps</a>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapState = (state) => ({
    currentUser: state.authReducer.currentUser,
    isLoggedIn: state.authReducer.isLoggedIn,
    user: state.authReducer.user,
    userID: state.authReducer.userID,
    errors: state.authReducer.errors
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


export default connect(mapState, mapDispatch)(Step3)