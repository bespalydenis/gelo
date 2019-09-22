import React from 'react'
import { connect } from 'react-redux';
import {login, setUserStatus, requestUserData} from "../../../../store/actions";
import * as icons from '../../../../assets';
import '../../index.scss';
import Select from 'react-select'
import axios from "axios";

class Step3 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userStatus: this.props.user.status,
            isAvailable: false || this.props.user.isAvailable,
            isAvailableGoogle: false || this.props.user.isAvailableGoogle,
            schedule: {
                monday: {
                    isAvailable: true,
                    from: { value: 9, label: '9:00' },
                    to: { value: 18, label: '18:00' }
                },
                tuesday: {
                    isAvailable: true,
                    from: { value: 9, label: '9:00' },
                    to: { value: 18, label: '18:00' }
                },
                wednesday: {
                    isAvailable: true,
                    from: { value: 9, label: '9:00' },
                    to: { value: 18, label: '18:00' }
                },
                thursday: {
                    isAvailable: true,
                    from: { value: 9, label: '9:00' },
                    to: { value: 18, label: '18:00' }
                },
                friday: {
                    isAvailable: true,
                    from: { value: 9, label: '9:00' },
                    to: { value: 18, label: '18:00' }
                },
                saturday: {
                    isAvailable: false,
                    from: { value: 9, label: '9:00' },
                    to: { value: 18, label: '18:00' }
                },
                sunday: {
                    isAvailable: false,
                    from: { value: 9, label: '9:00' },
                    to: { value: 18, label: '18:00' }
                },
            }
        };
    }


    componentDidMount() {
        this.props.requestUserData(this.props.userID);
    }

    handleAvailable = (e) => {
        if (this.state.isAvailable) {
            this.setState({
                isAvailable: false
            });
        } else {
            this.setState({
                isAvailable: true
            });
        }
    };

    handleAvailableGoogle = (e) => {
        if (this.state.isAvailableGoogle) {
            this.setState({
                isAvailableGoogle: false
            });
        } else {
            this.setState({
                isAvailableGoogle: true
            });
        }
    };

    handleNextStep = (e) => {
        e.preventDefault();

        axios.post('/api/users/completeStep4', {id: this.props.userID, meta: this.state}).then(result => {
            this.props.setUserStatus({ id: this.props.userID, status: 5 });
            //window.location.href = '/';
        });
    };

    prevStep = (e) => {
        e.preventDefault();

        this.props.setUserStatus({
            id: this.props.userID,
            status: this.props.user.status - 1
        })
    };

    setDayAvailable = (e) => {
        console.log('>> e', e.target);
        this.setState({
           schedule: {
               ...this.state.schedule,
               [e.target.id]: {
                   isAvailable: !this.state.schedule[e.target.id].isAvailable
               }
           }
        });
    };

    setMondayFrom = (selected) => {
        this.setState({
            schedule: {
                ...this.state.schedule,
                monday: {
                    ...this.state.schedule.monday,
                    from: selected
                }
            }
        })
    };

    render() {
        const options = [
            { value: '0', label: '0:00' },
            { value: '1', label: '1:00' },
            { value: '2', label: '2:00' },
            { value: '3', label: '3:00' },
            { value: '4', label: '4:00' },
            { value: '5', label: '5:00' },
            { value: '6', label: '6:00' },
            { value: '7', label: '7:00' },
            { value: '8', label: '8:00' },
            { value: '9', label: '9:00' },
            { value: '10', label: '10:00' },
            { value: '11', label: '11:00' },
            { value: '12', label: '12:00' },
            { value: '13', label: '13:00' },
            { value: '14', label: '14:00' },
            { value: '15', label: '15:00' },
            { value: '16', label: '16:00' },
            { value: '17', label: '17:00' },
            { value: '18', label: '18:00' },
            { value: '19', label: '19:00' },
            { value: '20', label: '20:00' },
            { value: '21', label: '21:00' },
            { value: '22', label: '22:00' },
            { value: '23', label: '23:00' },
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
                width: 120 - 29,
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
                right: 0,
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
                    <div className="authForm_title">Personal settings</div>
                    <p className={"currentStep"}>Step 4 of 4</p>
                </div>
                <div className="authForm_body authForm_steps authForm_steps-4">
                    <label className={(this.state.isAvailable) ? "label-activs active" : "label-activs"} onClick={this.handleAvailable}>
                        <div className="activs">
                            <div className="activs-option"></div>
                        </div>
                        <div className="col">
                            <span>Set available</span>
                            <p>Let us know when you’re typically available to work</p>
                        </div>
                    </label>
                    {
                        this.state.isAvailable
                            ? (
                                <div className="schedule">
                                    <div className="schedule_head">
                                        <div>Available days</div>
                                        <div>From</div>
                                        <div>To</div>
                                    </div>
                                    <div className="schedule_body">

                                        <div className="schedule_day">
                                            <div
                                                className={this.state.schedule.monday.isAvailable ? "daily active" : "daily"}>
                                                <div className={"checkbox"}
                                                     id={"monday"}
                                                     onClick={this.setDayAvailable}
                                                     style={{
                                                         background: `url(${(this.state.schedule.monday.isAvailable) ? icons.CHECKBOX_ON : icons.CHECKBOX})`
                                                     }}
                                                ></div>
                                                Monday</div>
                                            <Select
                                                options={options}
                                                data-day={"monday"}
                                                onChange={(selected) => { this.setState({ schedule: { ...this.state.schedule,
                                                        monday: { ...this.state.schedule.monday,
                                                            from: selected } } })
                                                }}
                                                value={this.state.schedule.monday.from}
                                                styles={customStyles}/>
                                            <Select
                                                options={options}
                                                onChange={(selected) => { this.setState({ schedule: { ...this.state.schedule,
                                                        monday: { ...this.state.schedule.monday, to: { value: selected.value,
                                                                label: `${selected.value}:00` } } } })
                                                }}
                                                value={this.state.schedule.monday.to}
                                                styles={customStyles}/>
                                        </div>

                                        <div className="schedule_day">
                                            <div
                                                className={this.state.schedule.tuesday.isAvailable ? "daily active" : "daily"}>
                                                <div className={"checkbox"}
                                                     id={"tuesday"}
                                                     onClick={this.setDayAvailable}
                                                     style={{
                                                         background: `url(${(this.state.schedule.tuesday.isAvailable) ? icons.CHECKBOX_ON : icons.CHECKBOX})`
                                                     }}
                                                ></div>
                                                Tuesday</div>
                                            <Select
                                                options={options}
                                                data-day={"tuesday"}
                                                onChange={(selected) => { this.setState({ schedule: { ...this.state.schedule,
                                                        tuesday: { ...this.state.schedule.tuesday,
                                                            from: selected } } })
                                                }}
                                                value={this.state.schedule.tuesday.from}
                                                styles={customStyles}/>
                                            <Select
                                                options={options}
                                                onChange={(selected) => { this.setState({ schedule: { ...this.state.schedule,
                                                        tuesday: { ...this.state.schedule.tuesday, to: { value: selected.value,
                                                                label: `${selected.value}:00` } } } })
                                                }}
                                                value={this.state.schedule.tuesday.to}
                                                styles={customStyles}/>
                                        </div>
                                        <div className="schedule_day">
                                            <div
                                                className={this.state.schedule.wednesday.isAvailable ? "daily active" : "daily"}>
                                                <div className={"checkbox"}
                                                     id={"wednesday"}
                                                     onClick={this.setDayAvailable}
                                                     style={{
                                                         background: `url(${(this.state.schedule.wednesday.isAvailable) ? icons.CHECKBOX_ON : icons.CHECKBOX})`
                                                     }}
                                                ></div>
                                                Wednesday</div>
                                            <Select
                                                options={options}
                                                data-day={"wednesday"}
                                                onChange={(selected) => { this.setState({ schedule: { ...this.state.schedule,
                                                        wednesday: { ...this.state.schedule.wednesday,
                                                            from: selected } } })
                                                }}
                                                value={this.state.schedule.wednesday.from}
                                                styles={customStyles}/>
                                            <Select
                                                options={options}
                                                onChange={(selected) => { this.setState({ schedule: { ...this.state.schedule,
                                                        wednesday: { ...this.state.schedule.wednesday, to: { value: selected.value,
                                                                label: `${selected.value}:00` } } } })
                                                }}
                                                value={this.state.schedule.wednesday.to}
                                                styles={customStyles}/>
                                        </div>
                                        <div className="schedule_day">
                                            <div
                                                className={this.state.schedule.thursday.isAvailable ? "daily active" : "daily"}>
                                                <div className={"checkbox"}
                                                     id={"thursday"}
                                                     onClick={this.setDayAvailable}
                                                     style={{
                                                         background: `url(${(this.state.schedule.thursday.isAvailable) ? icons.CHECKBOX_ON : icons.CHECKBOX})`
                                                     }}
                                                ></div>
                                                Thursday</div>
                                            <Select
                                                options={options}
                                                data-day={"thursday"}
                                                onChange={(selected) => { this.setState({ schedule: { ...this.state.schedule,
                                                        thursday: { ...this.state.schedule.thursday,
                                                            from: selected } } })
                                                }}
                                                value={this.state.schedule.thursday.from}
                                                styles={customStyles}/>
                                            <Select
                                                options={options}
                                                onChange={(selected) => { this.setState({ schedule: { ...this.state.schedule,
                                                        thursday: { ...this.state.schedule.thursday, to: { value: selected.value,
                                                                label: `${selected.value}:00` } } } })
                                                }}
                                                value={this.state.schedule.thursday.to}
                                                styles={customStyles}/>
                                        </div>
                                        <div className="schedule_day">
                                            <div
                                                className={this.state.schedule.friday.isAvailable ? "daily active" : "daily"}>
                                                <div className={"checkbox"}
                                                     id={"friday"}
                                                     onClick={this.setDayAvailable}
                                                     style={{
                                                         background: `url(${(this.state.schedule.friday.isAvailable) ? icons.CHECKBOX_ON : icons.CHECKBOX})`
                                                     }}
                                                ></div>
                                                Friday</div>
                                            <Select
                                                options={options}
                                                onChange={(selected) => { this.setState({ schedule: { ...this.state.schedule,
                                                        friday: { ...this.state.schedule.friday,
                                                            from: selected } } })
                                                }}
                                                value={this.state.schedule.friday.from}
                                                styles={customStyles}/>
                                            <Select
                                                options={options}
                                                onChange={(selected) => { this.setState({ schedule: { ...this.state.schedule,
                                                        friday: { ...this.state.schedule.friday, to: { value: selected.value,
                                                                label: `${selected.value}:00` } } } })
                                                }}
                                                value={this.state.schedule.friday.to}
                                                styles={customStyles}/>
                                        </div>
                                        <div className="schedule_day">
                                            <div
                                                className={this.state.schedule.saturday.isAvailable ? "daily active" : "daily"}>
                                                <div className={"checkbox"}
                                                     id={"saturday"}
                                                     onClick={this.setDayAvailable}
                                                     style={{
                                                         background: `url(${(this.state.schedule.saturday.isAvailable) ? icons.CHECKBOX_ON : icons.CHECKBOX})`
                                                     }}
                                                ></div>
                                                Saturday</div>
                                            <Select
                                                options={options}
                                                onChange={(selected) => { this.setState({ schedule: { ...this.state.schedule,
                                                        saturday: { ...this.state.schedule.saturday,
                                                            from: selected } } })
                                                }}
                                                value={this.state.schedule.saturday.from}
                                                styles={customStyles}/>
                                            <Select
                                                options={options}
                                                onChange={(selected) => { this.setState({ schedule: { ...this.state.schedule,
                                                        saturday: { ...this.state.schedule.saturday, to: { value: selected.value,
                                                                label: `${selected.value}:00` } } } })
                                                }}
                                                value={this.state.schedule.saturday.to}
                                                styles={customStyles}/>
                                        </div>
                                        <div className="schedule_day">
                                            <div
                                                className={this.state.schedule.sunday.isAvailable ? "daily active" : "daily"}>
                                                <div className={"checkbox"}
                                                     id={"sunday"}
                                                     onClick={this.setDayAvailable}
                                                     style={{
                                                         background: `url(${(this.state.schedule.sunday.isAvailable) ? icons.CHECKBOX_ON : icons.CHECKBOX})`
                                                     }}
                                                ></div>
                                                Sunday</div>
                                            <Select
                                                options={options}
                                                onChange={(selected) => { this.setState({ schedule: { ...this.state.schedule,
                                                        sunday: { ...this.state.schedule.sunday,
                                                            from: selected } } })
                                                }}
                                                value={this.state.schedule.sunday.from}
                                                styles={customStyles}/>
                                            <Select
                                                options={options}
                                                onChange={(selected) => { this.setState({ schedule: { ...this.state.schedule,
                                                        sunday: { ...this.state.schedule.sunday, to: { value: selected.value,
                                                                label: `${selected.value}:00` } } } })
                                                }}
                                                value={this.state.schedule.sunday.to}
                                                styles={customStyles}/>
                                        </div>
                                    </div>
                                </div>
                            )
                            : null
                    }
                    <label className={(this.state.isAvailableGoogle) ? "label-activs active" : "label-activs"} onClick={this.handleAvailableGoogle}>
                        <div className="activs">
                            <div className="activs-option"></div>
                        </div>
                        <div className="col">
                            <span>Connect Google calendar</span>
                            <p>Sync your scheduled tasks and your Google Calendar</p>
                        </div>
                    </label>
                    <button
                        className={"btn btn-blue btn-continue"}
                        onClick={this.handleNextStep}
                    >
                        Continue
                    </button>
                    <div className="stepActions">
                        <a className="stepActions_prev"
                           onClick={this.prevStep}
                        >Back to previous step</a>
                        <a className="stepActions_skip"></a>
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