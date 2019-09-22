import React from 'react'
import { connect } from 'react-redux';
import {setUserStatus} from "../../../../store/actions";
import '../../index.scss';
import Select from 'react-select'
import axios from 'axios';

class Step3 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userStatus: this.props.user.status,
            personalPhoto: null || this.props.user.personalPhoto,
            gender: 'm' || this.props.user.gender,
            birthMonth: '' || this.props.user.birthMonth,
            birthDay: '' || this.props.user.birthDay,
            birthYear: '' || this.props.user.birthYear,
            jobTitle: '' || this.props.user.jobTitle,
            bio: '' || this.props.user.bio
        };
    }

    onChange = (e) => {
        console.log('>> e', e.target.id, e.target.value);
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

    render() {
        const optionsMonth = [
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
            { value: '6', label: '6' },
            { value: '7', label: '7' },
            { value: '8', label: '8' },
            { value: '9', label: '9' },
            { value: '10', label: '10' },
            { value: '11', label: '11' },
            { value: '12', label: '12' }
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
        return (
            <React.Fragment>
                <div className="authForm_head">
                    <div className="authForm_title">Personal details</div>
                    <p className={"currentStep"}>Step 3 of 4</p>
                </div>
                <div className="authForm_body authForm_steps">
                    <div className="authStep">
                        <div className="authStep_loadImage">
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
                            <input type="text"
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
    setUserStatus: data => {
        dispatch(setUserStatus(data))
    }
});


export default connect(mapState, mapDispatch)(Step3)