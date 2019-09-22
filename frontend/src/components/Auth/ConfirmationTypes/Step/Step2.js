import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {login, setUserStatus, requestUserData} from "../../../../store/actions";
import '../../index.scss';
import Select from 'react-select'
import axios from "axios";

class Step2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userStatus: this.props.user.status,
            language: 'english' && this.props.user.language,
            unitSystem: 'metric' && this.props.user.unitSystem,
            currency: 'usd' && this.props.user.currency,
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleNextStep = (e) => {
        e.preventDefault();
        console.log('>> metric system', this.state.unitSystem);
        axios.post('/api/users/completeStep2', {id: this.props.userID, meta: this.state}).then(result => {
            console.log('>> completeStep2', result);
            this.props.setUserStatus({ id: this.props.userID, status: 3 });
        }).catch(error => {
            console.log('>> error', error);
        });
    };

    changeUnitSystem = (e) => {
        const unitSystem = e.target.closest('.cCheckbox').dataset.usersystem;
        console.log(">> unitSystem", unitSystem);
        if(unitSystem === 'metric' || unitSystem === 'imperial') {
            console.log('>> UN');
            this.setState({ unitSystem: unitSystem });
        }

    };

    setLanguage = (selected) => {
        this.setState({ language: selected.value });
    };

    setCurrency = (selected) => {
        this.setState({ currency: selected.value });
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

        console.log('>> pS', this.props.userID);

        this.props.setUserStatus({
            id: this.props.userID,
            status: this.props.user.status - 1
        })
    };

    render() {
        const optionsLanguage = [
            { value: 'english', label: 'English' }
        ];

        const optionsCurrency = [
            { value: 'usd', label: '$ - United States Dollars (USD)' }
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

        console.log('>> STEP #2', this.state.unitSystem);

        return (
            <React.Fragment>
                <div className="authForm_head">
                    <div className="authForm_title">Organization settings</div>
                    <p className={"currentStep"}>Step 2 of 4</p>
                </div>
                <div className="authForm_body authForm_steps">
                    <label className={"label50 label50-left"}>
                        <span>Language</span>
                        <Select options={optionsLanguage}
                                defaultValue={{ value: 'english', label: 'English' }}
                                onChange={this.setLanguage}
                                styles={customStyles} />
                    </label>
                    <label className={"label50 label50-right"}>
                    </label>
                    <label className={"label-cCheckboxes"}>
                        <span>Unit system</span>
                        <div className="row">
                            <div data-usersystem={"metric"} className={(this.state.unitSystem === 'metric') ? "cCheckbox cCheckbox-active" : "cCheckbox"}
                                 onClick={this.changeUnitSystem}
                            >
                                <div className="cCheckbox_input"></div>
                                <p>Metric system (cm / kg)</p>
                            </div>
                            <div data-usersystem={"imperial"} className={(this.state.unitSystem === 'imperial') ? "cCheckbox cCheckbox-active" : "cCheckbox"}
                                 onClick={this.changeUnitSystem}
                            >
                                <div className="cCheckbox_input"></div>
                                <p>Imperial (ft / lbs)</p>
                            </div>
                        </div>
                    </label>
                    <label className={""}>
                        <span>Currency</span>
                        <Select
                            options={optionsCurrency}
                            defaultValue={{ value: 'usd', label: '$ - United States Dollars (USD)' }}
                            onChange={this.setCurrency}
                            styles={customStyles} />
                    </label>
                    <button
                        className={"btn btn-blue btn-continue btn-mt"}
                        onClick={this.handleNextStep}
                    >
                        Continue
                    </button>
                    <div className="stepActions">
                        <Link className={"stepActions_prev"} onClick={this.prevStep}>Back to previous step</Link>
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


export default connect(mapState, mapDispatch)(Step2)