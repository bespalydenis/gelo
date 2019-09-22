import React from 'react'
import { connect } from 'react-redux';
import {setUserStatus} from "../../../../store/actions";
import '../../index.scss';
import Select from 'react-select'
import axios from 'axios';

class Step2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userStatus: this.props.user.status,
            language: 'english' || this.props.user.language,
            unitSystem: 'metric' || this.props.user.unitSystem,
            currency: 'usd' || this.props.user.currency
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleNextStep = (e) => {
        e.preventDefault();

        axios.post('/api/users/completeStep2', {id: this.props.userID, meta: this.state}).then(result => {
            console.log('>> completeStep2', result);
            this.props.setUserStatus({ id: this.props.userID, status: 3 });
        });
    };

    changeUnitSystem = (e) => {
        const unitSystem = e.target.closest('.cCheckbox').dataset.usersystem;

        if(unitSystem === 'metric' || unitSystem === 'imperial')
            this.setState({ unitSystem: unitSystem });
    };

    setLanguage = (selected) => {
        this.setState({ language: selected.value });
    };

    setCurrency = (selected) => {
        this.setState({ currency: selected.value });
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


        /*

        STATUSES:
        0 - confirm email
        1 - step1
        -- 2 - step2
        3 - step3
        4 - step4
        5 - success confirmation
 this.setState({ unitSystem: 'metric' })
        */
        console.log('>> state', this.state);

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


export default connect(mapState, mapDispatch)(Step2)