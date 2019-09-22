import React from 'react'
import { connect } from 'react-redux';
import {setUserStatus,requestUserData} from "../../../../store/actions";
import * as icons from '../../../../assets';
import '../../index.scss';
import Select from 'react-select'
import axios from 'axios';
import InputElement from 'react-input-mask';

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
            isWarningShows: true,
            errors: {
                organizationTitle: false
            },
            countries: [
                {label: 'Afghanistan', value: 'AF'},
                {label: 'Åland Islands', value: 'AX'},
                {label: 'Albania', value: 'AL'},
                {label: 'Algeria', value: 'DZ'},
                {label: 'American Samoa', value: 'AS'},
                {label: 'AndorrA', value: 'AD'},
                {label: 'Angola', value: 'AO'},
                {label: 'Anguilla', value: 'AI'},
                {label: 'Antarctica', value: 'AQ'},
                {label: 'Antigua and Barbuda', value: 'AG'},
                {label: 'Argentina', value: 'AR'},
                {label: 'Armenia', value: 'AM'},
                {label: 'Aruba', value: 'AW'},
                {label: 'Australia', value: 'AU'},
                {label: 'Austria', value: 'AT'},
                {label: 'Azerbaijan', value: 'AZ'},
                {label: 'Bahamas', value: 'BS'},
                {label: 'Bahrain', value: 'BH'},
                {label: 'Bangladesh', value: 'BD'},
                {label: 'Barbados', value: 'BB'},
                {label: 'Belarus', value: 'BY'},
                {label: 'Belgium', value: 'BE'},
                {label: 'Belize', value: 'BZ'},
                {label: 'Benin', value: 'BJ'},
                {label: 'Bermuda', value: 'BM'},
                {label: 'Bhutan', value: 'BT'},
                {label: 'Bolivia', value: 'BO'},
                {label: 'Bosnia and Herzegovina', value: 'BA'},
                {label: 'Botswana', value: 'BW'},
                {label: 'Bouvet Island', value: 'BV'},
                {label: 'Brazil', value: 'BR'},
                {label: 'British Indian Ocean Territory', value: 'IO'},
                {label: 'Brunei Darussalam', value: 'BN'},
                {label: 'Bulgaria', value: 'BG'},
                {label: 'Burkina Faso', value: 'BF'},
                {label: 'Burundi', value: 'BI'},
                {label: 'Cambodia', value: 'KH'},
                {label: 'Cameroon', value: 'CM'},
                {label: 'Canada', value: 'CA'},
                {label: 'Cape Verde', value: 'CV'},
                {label: 'Cayman Islands', value: 'KY'},
                {label: 'Central African Republic', value: 'CF'},
                {label: 'Chad', value: 'TD'},
                {label: 'Chile', value: 'CL'},
                {label: 'China', value: 'CN'},
                {label: 'Christmas Island', value: 'CX'},
                {label: 'Cocos (Keeling) Islands', value: 'CC'},
                {label: 'Colombia', value: 'CO'},
                {label: 'Comoros', value: 'KM'},
                {label: 'Congo', value: 'CG'},
                {label: 'Congo, The Democratic Republic of the', value: 'CD'},
                {label: 'Cook Islands', value: 'CK'},
                {label: 'Costa Rica', value: 'CR'},
                {label: 'Cote D\'Ivoire', value: 'CI'},
                {label: 'Croatia', value: 'HR'},
                {label: 'Cuba', value: 'CU'},
                {label: 'Cyprus', value: 'CY'},
                {label: 'Czech Republic', value: 'CZ'},
                {label: 'Denmark', value: 'DK'},
                {label: 'Djibouti', value: 'DJ'},
                {label: 'Dominica', value: 'DM'},
                {label: 'Dominican Republic', value: 'DO'},
                {label: 'Ecuador', value: 'EC'},
                {label: 'Egypt', value: 'EG'},
                {label: 'El Salvador', value: 'SV'},
                {label: 'Equatorial Guinea', value: 'GQ'},
                {label: 'Eritrea', value: 'ER'},
                {label: 'Estonia', value: 'EE'},
                {label: 'Ethiopia', value: 'ET'},
                {label: 'Falkland Islands (Malvinas)', value: 'FK'},
                {label: 'Faroe Islands', value: 'FO'},
                {label: 'Fiji', value: 'FJ'},
                {label: 'Finland', value: 'FI'},
                {label: 'France', value: 'FR'},
                {label: 'French Guiana', value: 'GF'},
                {label: 'French Polynesia', value: 'PF'},
                {label: 'French Southern Territories', value: 'TF'},
                {label: 'Gabon', value: 'GA'},
                {label: 'Gambia', value: 'GM'},
                {label: 'Georgia', value: 'GE'},
                {label: 'Germany', value: 'DE'},
                {label: 'Ghana', value: 'GH'},
                {label: 'Gibraltar', value: 'GI'},
                {label: 'Greece', value: 'GR'},
                {label: 'Greenland', value: 'GL'},
                {label: 'Grenada', value: 'GD'},
                {label: 'Guadeloupe', value: 'GP'},
                {label: 'Guam', value: 'GU'},
                {label: 'Guatemala', value: 'GT'},
                {label: 'Guernsey', value: 'GG'},
                {label: 'Guinea', value: 'GN'},
                {label: 'Guinea-Bissau', value: 'GW'},
                {label: 'Guyana', value: 'GY'},
                {label: 'Haiti', value: 'HT'},
                {label: 'Heard Island and Mcdonald Islands', value: 'HM'},
                {label: 'Holy See (Vatican City State)', value: 'VA'},
                {label: 'Honduras', value: 'HN'},
                {label: 'Hong Kong', value: 'HK'},
                {label: 'Hungary', value: 'HU'},
                {label: 'Iceland', value: 'IS'},
                {label: 'India', value: 'IN'},
                {label: 'Indonesia', value: 'ID'},
                {label: 'Iran, Islamic Republic Of', value: 'IR'},
                {label: 'Iraq', value: 'IQ'},
                {label: 'Ireland', value: 'IE'},
                {label: 'Isle of Man', value: 'IM'},
                {label: 'Israel', value: 'IL'},
                {label: 'Italy', value: 'IT'},
                {label: 'Jamaica', value: 'JM'},
                {label: 'Japan', value: 'JP'},
                {label: 'Jersey', value: 'JE'},
                {label: 'Jordan', value: 'JO'},
                {label: 'Kazakhstan', value: 'KZ'},
                {label: 'Kenya', value: 'KE'},
                {label: 'Kiribati', value: 'KI'},
                {label: 'Korea, Democratic People\'S Republic of', value: 'KP'},
                {label: 'Korea, Republic of', value: 'KR'},
                {label: 'Kuwait', value: 'KW'},
                {label: 'Kyrgyzstan', value: 'KG'},
                {label: 'Lao People\'S Democratic Republic', value: 'LA'},
                {label: 'Latvia', value: 'LV'},
                {label: 'Lebanon', value: 'LB'},
                {label: 'Lesotho', value: 'LS'},
                {label: 'Liberia', value: 'LR'},
                {label: 'Libyan Arab Jamahiriya', value: 'LY'},
                {label: 'Liechtenstein', value: 'LI'},
                {label: 'Lithuania', value: 'LT'},
                {label: 'Luxembourg', value: 'LU'},
                {label: 'Macao', value: 'MO'},
                {label: 'Macedonia, The Former Yugoslav Republic of', value: 'MK'},
                {label: 'Madagascar', value: 'MG'},
                {label: 'Malawi', value: 'MW'},
                {label: 'Malaysia', value: 'MY'},
                {label: 'Maldives', value: 'MV'},
                {label: 'Mali', value: 'ML'},
                {label: 'Malta', value: 'MT'},
                {label: 'Marshall Islands', value: 'MH'},
                {label: 'Martinique', value: 'MQ'},
                {label: 'Mauritania', value: 'MR'},
                {label: 'Mauritius', value: 'MU'},
                {label: 'Mayotte', value: 'YT'},
                {label: 'Mexico', value: 'MX'},
                {label: 'Micronesia, Federated States of', value: 'FM'},
                {label: 'Moldova, Republic of', value: 'MD'},
                {label: 'Monaco', value: 'MC'},
                {label: 'Mongolia', value: 'MN'},
                {label: 'Montserrat', value: 'MS'},
                {label: 'Morocco', value: 'MA'},
                {label: 'Mozambique', value: 'MZ'},
                {label: 'Myanmar', value: 'MM'},
                {label: 'Namibia', value: 'NA'},
                {label: 'Nauru', value: 'NR'},
                {label: 'Nepal', value: 'NP'},
                {label: 'Netherlands', value: 'NL'},
                {label: 'Netherlands Antilles', value: 'AN'},
                {label: 'New Caledonia', value: 'NC'},
                {label: 'New Zealand', value: 'NZ'},
                {label: 'Nicaragua', value: 'NI'},
                {label: 'Niger', value: 'NE'},
                {label: 'Nigeria', value: 'NG'},
                {label: 'Niue', value: 'NU'},
                {label: 'Norfolk Island', value: 'NF'},
                {label: 'Northern Mariana Islands', value: 'MP'},
                {label: 'Norway', value: 'NO'},
                {label: 'Oman', value: 'OM'},
                {label: 'Pakistan', value: 'PK'},
                {label: 'Palau', value: 'PW'},
                {label: 'Palestinian Territory, Occupied', value: 'PS'},
                {label: 'Panama', value: 'PA'},
                {label: 'Papua New Guinea', value: 'PG'},
                {label: 'Paraguay', value: 'PY'},
                {label: 'Peru', value: 'PE'},
                {label: 'Philippines', value: 'PH'},
                {label: 'Pitcairn', value: 'PN'},
                {label: 'Poland', value: 'PL'},
                {label: 'Portugal', value: 'PT'},
                {label: 'Puerto Rico', value: 'PR'},
                {label: 'Qatar', value: 'QA'},
                {label: 'Reunion', value: 'RE'},
                {label: 'Romania', value: 'RO'},
                {label: 'Russian Federation', value: 'RU'},
                {label: 'RWANDA', value: 'RW'},
                {label: 'Saint Helena', value: 'SH'},
                {label: 'Saint Kitts and Nevis', value: 'KN'},
                {label: 'Saint Lucia', value: 'LC'},
                {label: 'Saint Pierre and Miquelon', value: 'PM'},
                {label: 'Saint Vincent and the Grenadines', value: 'VC'},
                {label: 'Samoa', value: 'WS'},
                {label: 'San Marino', value: 'SM'},
                {label: 'Sao Tome and Principe', value: 'ST'},
                {label: 'Saudi Arabia', value: 'SA'},
                {label: 'Senegal', value: 'SN'},
                {label: 'Serbia and Montenegro', value: 'CS'},
                {label: 'Seychelles', value: 'SC'},
                {label: 'Sierra Leone', value: 'SL'},
                {label: 'Singapore', value: 'SG'},
                {label: 'Slovakia', value: 'SK'},
                {label: 'Slovenia', value: 'SI'},
                {label: 'Solomon Islands', value: 'SB'},
                {label: 'Somalia', value: 'SO'},
                {label: 'South Africa', value: 'ZA'},
                {label: 'South Georgia and the South Sandwich Islands', value: 'GS'},
                {label: 'Spain', value: 'ES'},
                {label: 'Sri Lanka', value: 'LK'},
                {label: 'Sudan', value: 'SD'},
                {label: 'Surilabel', value: 'SR'},
                {label: 'Svalbard and Jan Mayen', value: 'SJ'},
                {label: 'Swaziland', value: 'SZ'},
                {label: 'Sweden', value: 'SE'},
                {label: 'Switzerland', value: 'CH'},
                {label: 'Syrian Arab Republic', value: 'SY'},
                {label: 'Taiwan, Province of China', value: 'TW'},
                {label: 'Tajikistan', value: 'TJ'},
                {label: 'Tanzania, United Republic of', value: 'TZ'},
                {label: 'Thailand', value: 'TH'},
                {label: 'Timor-Leste', value: 'TL'},
                {label: 'Togo', value: 'TG'},
                {label: 'Tokelau', value: 'TK'},
                {label: 'Tonga', value: 'TO'},
                {label: 'Trinidad and Tobago', value: 'TT'},
                {label: 'Tunisia', value: 'TN'},
                {label: 'Turkey', value: 'TR'},
                {label: 'Turkmenistan', value: 'TM'},
                {label: 'Turks and Caicos Islands', value: 'TC'},
                {label: 'Tuvalu', value: 'TV'},
                {label: 'Uganda', value: 'UG'},
                {label: 'Ukraine', value: 'UA'},
                {label: 'United Arab Emirates', value: 'AE'},
                {label: 'United Kingdom', value: 'GB'},
                {label: 'United States', value: 'US'},
                {label: 'United States Minor Outlying Islands', value: 'UM'},
                {label: 'Uruguay', value: 'UY'},
                {label: 'Uzbekistan', value: 'UZ'},
                {label: 'Vanuatu', value: 'VU'},
                {label: 'Venezuela', value: 'VE'},
                {label: 'Viet Nam', value: 'VN'},
                {label: 'Virgin Islands, British', value: 'VG'},
                {label: 'Virgin Islands, U.S.', value: 'VI'},
                {label: 'Wallis and Futuna', value: 'WF'},
                {label: 'Western Sahara', value: 'EH'},
                {label: 'Yemen', value: 'YE'},
                {label: 'Zambia', value: 'ZM'},
                {label: 'Zimbabwe', value: 'ZW'}
            ]
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

        if(this.state.organizationTitle && !this.state.errors.organizationTitle) {
            console.log(">> S 1");
            axios.post('/api/users/completeStep1', {id: this.props.userID, meta: this.state}).then(result => {
                console.log('>> completeStep1', result);
                console.log('>> STEP1!', this.props.userID);
                this.props.setUserStatus({ id: this.props.userID, status: 2});
            }).catch(error => {
                console.log('>> error', error);
            });
        } else {
            console.log(">> S 2");
            this.setState({
                errors: {
                    ...this.state.errors,
                    organizationTitle: true
                }
            });
            window.scrollTo(0,0);
        }

    };

    skipSteps = (e) => {
        e.preventDefault();

        this.props.setUserStatus({
            id: this.props.userID,
            status: 5
        })
    };

    closeWarning = (e) => {
        this.setState({
            isWarningShows: !this.state.isWarningShows
        });
    };

    handleKeyUp = (e) => {
        console.log('>> E TARGET', e.target.value);
        if (e.target.value.length > 3 && this.state.errors.organizationTitle) {
            this.setState({
                errors: {
                    ...this.state.errors,
                    organizationTitle: false
                }
            });
        }
    };

    handleChangePhone = (e) => {
        console.log('>> Change Phone', e.target);
    };

    render() {
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

        console.log(">> DATA #1", this.props.user);

        return (
            <React.Fragment>
                <div className="authForm_head">
                    <div className="authForm_title">Organization details</div>
                    <p className={"currentStep"}>Step 1 of 4</p>
                </div>
                {
                    this.state.isWarningShows
                    ?
                        ( <div className="authWarning">
                            <a
                                className={"close"}
                                onClick={this.closeWarning}
                            >
                                <img src={icons.CLOSE} alt=""/>
                            </a>
                            <div className="col">
                                <div className="authWarning_title">Welcome {this.props.user.firstName} {this.props.user.lastName}!  👋 </div>
                                <p>You confirmed the email address, and now we can complete your personal <br/>
                                    and account settings. </p>
                                <a className="link"
                                   onClick={this.skipSteps}
                                >Skip all steps and do it later in the settings menu.</a>
                            </div>
                        </div> )
                        : null
                }
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
                            onKeyUp={this.handleKeyUp}
                            value={this.state.organizationTitle}
                            className={this.state.errors.organizationTitle ? "invalid" : null}
                        />
                    </label>
                    <label>
                        <span>Country</span>
                        <Select options={this.state.countries}
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
                        <InputElement
                            onChange={this.onChange}
                            placeholder={"Example: +1 212-332-6868"}
                            type={"tel"}
                            mask="+9 999-999-9999"
                            id={"phoneNumber1"}
                            onKeyUp={this.handleKeyUp}
                            value={this.state.phoneNumber1}
                            onChange={this.onChange}
                        />
                    </label>
                    <label className={"label50 label50-right"}>
                        <span>Phone number 2</span>
                        <InputElement
                            onChange={this.onChange}
                            placeholder={"Example: +1 212-332-6868"}
                            type={"tel"}
                            mask="+9 999-999-9999"
                            id={"phoneNumber2"}
                            onKeyUp={this.handleKeyUp}
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
                    <div className="stepActions">
                        <a className="stepActions_prev"></a>
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
    user: state.authReducer.user,
    errors: state.authReducer.errors
});

const mapDispatch = (dispatch) => ({
    setUserStatus: data => {
        dispatch(setUserStatus(data))
    },
    requestUserData: data => {
        dispatch(requestUserData(data))
    }
});


export default connect(mapState, mapDispatch)(Step1)