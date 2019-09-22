/* eslint-disable */

import {
    RECEIVE_USERS,
    SET_CURRENT_USER,
    ADD_USER,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
    RECEIVE_USER_UPDATE,
    UPDATE_USER_STATUS,
    SET_CURRENT_USER_DATA,
    SET_USER_STATUS,
    RECEIVE_USER_DATA
} from '../actions';

const isEmpty = require('is-empty');

const initState = {
    isLoggedIn: false,
    currentUser: 'admin?',
    units: null,
    errors: null,
    user: {},
    access: 0,
    loading: false,
    userStatus: null,
    userID: null
};

export default (state = initState, {type, data = "default"}) => {
    switch (type) {
        case RECEIVE_USERS:
            return {
                ...state,
                units: data
            };

        case RECEIVE_USER_DATA:
            return {
                ...state,
                user: data
            };

        case SET_CURRENT_USER:
            return {
                ...state,
                isLoggedIn: true,
                userID: data,
            };

        case LOGIN:
            console.log('>> reducer Login', data);
            return {
                ...state,
                userID: data.id,
                userStatus: data.status,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                userID: data.userID
            };

        case LOGIN_ERROR:
            return {
                ...state,
                isLoggedIn: false,
                errors: data.errors
            };

        case RECEIVE_USER_UPDATE:
            return {
                ...state
            };

        case ADD_USER:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_USER_STATUS:
            return {
                ...state,
                userStatus: data,
            };


        case SET_CURRENT_USER_DATA:
            return {
                ...state,
                isLoggedIn: true,
                user: data,
                userStatus: data.status,
                userID: data.userID
            };

        case SET_USER_STATUS:
            return {
                ...state
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