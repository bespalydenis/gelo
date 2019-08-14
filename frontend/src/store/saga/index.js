import { takeLatest, all, put, call } from 'redux-saga/effects';
import {
    REQUEST_USERS,
    receiveUsers,
    ADD_USER,
    addUser,
    SET_CURRENT_USER,
    LOGIN,
    login,
    loginSuccess,
    LOGOUT
} from '../actions';
import axios from 'axios'
import setAuthToken from "../../utils/setAuthToken";
import jwt from "jsonwebtoken";


// -------------------------

function callLogin(data) {
    return axios.post('/api/users/login', {email: data.email, password: data.password});
}

function* userLogin(action) {
    try {
        let responce = yield call(callLogin, action.data);
        responce = yield responce.data;
        console.log('>> responce', responce);
        if(responce) {
            localStorage.setItem('jwtToken', responce.token);
            setAuthToken(responce.token);
            yield put(loginSuccess(responce))
        } else {
            console.log('nhr', responce);
        }
    } catch(e) {
        console.log('>> Login Error', e);
    }
}

// -------------------------

function fetchUnits(data) {
    console.log('>> saga units', data);
    return axios.post('/api/users/units', { userID: data } );
}

function* getUsers(action) {
    console.log('>> getUsers', action.data);
    try {
        const response = yield call(fetchUnits, action.data);
        const units = response.data;
        yield put(receiveUsers(units));
    } catch(e) {
        console.log('>> getUsers error', action.data);
        yield put(receiveUsers('Test was success! Error!'));
    }
}

// -------------------------

function callAddNewUser(data) {
    return axios.post('/api/users/registration', data);
}

function* addNewUser(action) {
    console.log('>> ', action.data);
    try {
        axios.post('/api/users/register', action.data)
            .then(res => {
                console.log('>> addUser', res);
            })
            .catch(errors => {
                if (errors.response) {
                   console.log('>> E2');
                } else if (errors.request) {
                    console.log('E', errors.request);
                } else {
                    console.log('Error', errors.message);
                }
            })
    } catch(e) {
        yield put(receiveUsers('Test was success! Error!'));
    }
}

// -------------------------

function* logout() {
    try {
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
    } catch(e) {

    }
}

function* watcher() {
    yield takeLatest(REQUEST_USERS, getUsers);
    yield takeLatest(ADD_USER, addNewUser);
    yield takeLatest(LOGIN, userLogin);
    yield takeLatest(LOGOUT, logout);
}

export default function* saga() {
    yield all([watcher()]);
}