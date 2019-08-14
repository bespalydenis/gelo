import {RECEIVE_USERS, SET_CURRENT_USER, ADD_USER, LOGIN, LOGIN_SUCCESS, LOGOUT} from '../actions';

const isEmpty = require('is-empty');

const initState = {
    isLoggedIn: false,
    currentUser: 'admin?',
    user: {},
    units: [''],
    access: 0,
    loading: false,
};

export default (state = initState, {type, data = "default"}) => {
    switch (type) {
        case RECEIVE_USERS:
            return {
                ...state,
                // isLoggedIn: !isEmpty(action.payload),
                units: data
            };

        case SET_CURRENT_USER:
            return {
                ...state,
                // isLoggedIn: !isEmpty(action.payload),
                user: data,
                isLoggedIn: true,
                userID: data.id
            };

        case LOGIN:
            console.log('>> reducer Login', data);
            return {
                ...state,
                // isLoggedIn: !isEmpty(action.payload),
                userID: data.id
            };

        case LOGIN_SUCCESS:
            console.log('>> reducer login_success', data);
            return {
                ...state,
                isLoggedIn: true,
                userID: data.userID
            };

        case ADD_USER:
            return {
                ...state,
                loading: false,
            };

        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                userID: null
            };
        //
        // case USER_LOADING:
        //     return {
        //         ...state,
        //         loading: true
        //     };

        default:
            return state;
    }
}