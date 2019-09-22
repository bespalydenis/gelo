import React from 'react'
import { connect } from 'react-redux';
import {setUserStatus} from "../../../../store/actions";
import '../../index.scss';
import Select from 'react-select'
import axios from 'axios';

class Step1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userStatus: this.props.userStatus,
            profilePhoto: this.props.user.profilePhoto,
            organizationTitle: this.props.user.organizationTitle,
            country: this.props.user.country,
            city: this.props.user.city,
            zip: this.props.user.zip,
            address: this.props.user.address,
            phoneNumber1: this.props.user.phoneNumber1,
            phoneNumber2: this.props.user.phoneNumber2,
            website: this.props.user.website,
            accountDesc: this.props.user.accountDesc,
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
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

    removeProfilePhoto = (e) => {
        this.setState({
            profilePhoto: null
        });
    };

    setCountry = (selected) => {
        this.setState({ country: selected.value });
    };

    handleNextStep = (e) => {
        e.preventDefault();

        if(this.state.organizationTitle) {
            axios.post('/api/users/completeStep1', {id: this.props.userID, meta: this.state}).then(result => {
                this.props.setUserStatus({ id: this.props.userID, status: 2});
            });
        }

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

        return (
            <React.Fragment>
                <div className="authForm_head">
                    <div className="authForm_title">Organization details</div>
                    <p className={"currentStep"}>Step 1 of 4</p>
                </div>
                <div className="authWarning">
                    <div className="col">
                        <div className="authWarning_title">Welcome {this.props.user.firstName} {this.props.user.lastName}!  👋 </div>
                        <p>You confirmed the email address, and now we can complete your personal <br/>
                            and account settings. </p>
                        <a href="" className="link">Skip all steps and do it later in the settings menu.</a>

                    </div>
                </div>
                <div className="authForm_body authForm_steps">
                    <div className="authStep">
                        <div className="authStep_loadImage">
                            <div className="authStep_image" style={{
                                background: `url(${this.state.profilePhoto})`
                            }}></div>
                            {
                                (!this.state.profilePhoto)
                                    ? (
                                        <a href="javascript:void(0);" className={"btn btn-blue btn-empty btn-loadFile"}>
                                            <span>Upload image</span>
                                            <input type="file" onChange={this.setProfilePhoto}/>
                                        </a>
                                    )
                                    : (
                                        <React.Fragment>
                                            <a href="javascript:void(0);" className={"btn btn-blue btn-empty btn-loadFile"}>
                                                <span>Change image</span>
                                                <input type="file" onChange={this.setProfilePhoto}/>
                                            </a>
                                            <a href="javascript:void(0);" className={"link link-delete"} onClick={this.removeProfilePhoto}>Delete image</a>
                                        </React.Fragment>
                                    )
                            }

                        </div>
                    </div>
                    <label>
                        <span>Organization title <b>*</b></span>
                        <input
                            onChange={this.onChange}
                            placeholder={""}
                            type={"text"}
                            id={"organizationTitle"}
                            onChange={this.onChange}
                            value={this.state.organizationTitle}
                        />
                    </label>
                    <label>
                        <span>Country</span>
                        <Select options={options}
                                styles={customStyles}
                                onChange={this.setCountry}
                        />
                    </label>
                    <label className={"label50 label50-left"}>
                        <span>City</span>
                        <input
                            onChange={this.onChange}
                            placeholder={"Example: New York"}
                            type={"text"}
                            id={"city"}
                            value={this.state.city}
                            onChange={this.onChange}
                        />
                    </label>
                    <label className={"label50 label50-right"}>
                        <span>ZIP / Postal code</span>
                        <input
                            onChange={this.onChange}
                            placeholder={"Example: 10111"}
                            type={"text"}
                            id={"zip"}
                            value={this.state.zip}
                            onChange={this.onChange}
                        />
                    </label>
                    <label>
                        <span>Address</span>
                        <input
                            onChange={this.onChange}
                            placeholder={"Example: 45 Rockefeller Plaza"}
                            type={"text"}
                            id={"address"}
                            value={this.state.address}
                            onChange={this.onChange}
                        />
                    </label>
                    <label className={"label50 label50-left"}>
                        <span>Phone number 1</span>
                        <input
                            onChange={this.onChange}
                            placeholder={"Example: +1 212-332-6868"}
                            type={"text"}
                            id={"phoneNumber1"}
                            value={this.state.phoneNumber1}
                            onChange={this.onChange}
                        />
                    </label>
                    <label className={"label50 label50-right"}>
                        <span>Phone number 2</span>
                        <input
                            onChange={this.onChange}
                            placeholder={"Example: +1 212-332-6868"}
                            type={"text"}
                            id={"phoneNumber2"}
                            value={this.state.phoneNumber2}
                            onChange={this.onChange}
                        />
                    </label>
                    <label>
                        <span>Website</span>
                        <input
                            onChange={this.onChange}
                            placeholder={"Example: www.yourwebsite.com"}
                            type={"text"}
                            id={"website"}
                            value={this.state.website}
                            onChange={this.onChange}
                        />
                    </label>
                    <label className={"labelTextarea"}>
                        <span>Description</span>
                        <textarea
                            id={"accountDesc"}
                            value={this.state.accountDesc}
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


export default connect(mapState, mapDispatch)(Step1)