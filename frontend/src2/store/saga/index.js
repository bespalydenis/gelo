import { takeLatest, all, put, call } from 'redux-saga/effects';
import {
    REQUEST_USERS,
    ADD_USER,
    LOGIN,
    LOGOUT,
    UPDATE_USER,
    SET_USER_STATUS,
    RECEIVE_USER_DATA,
    REQUEST_USER_DATA,
    receiveUsers,
    login,
    loginSuccess,
    loginError, receiveUserData,
} from '../actions';
import axios from 'axios'
import setAuthToken from "../../utils/setAuthToken";

// -------------------------
function callLogin(data) {
    let result = axios.post('/api/users/login', {email: data.email, password: data.password});
    console.log('>>>> callLogin', result);
    return result;
}

function* userLogin(action) {
    console.log('>> UL', action);
    try {
        let responce = yield call(callLogin, action.data);
        responce = yield responce.data;
        console.log('>> responce', responce);
        if(responce && responce.errors) {
            console.log('>>>> responce errors');
            yield put(loginError(responce));
        } else if (responce) {
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


// -------------------------
function fetchUnits(data) {
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


// -------------------------
function callSetUserStatus(data) {
    console.log('>> setUserStatus was called');
    axios.post('/api/users/updateStatus', { id: data.id, status: data.status }).then(res => {
        console.log('>> gooood');
    }).catch(error => {
        console.log('>> baad');
    });
}

function* userStatus(action) {
    console.log('>> userStatus', action.data);
    try {
        const responce = yield call(callSetUserStatus, action.data);
        console.log('>> resp', responce);
        yield put(receiveUserData(action.data));
    } catch(e) {
        console.log('>> User Status', e);
    }
}
// -------------------------

// -------------------------
function callAddNewUser(newUser) {
    return axios.post('/api/users/register', newUser)
}

function* addNewUser(action) {
    try {
        const responce = yield call(callAddNewUser, action.data);
        const loginData = {
            email: responce.data.email,
            password: action.data.password
        };
        yield put(login(loginData));
    } catch(e) {
        console.log(e);
    }
}
// -------------------------


// -------------------------
function* logout() {
    try {
        localStorage.removeItem('jwtToken');
        setAuthToken(false);
    } catch(e) {

    }
}

function updateUserDataPost(data) {
    return axios.post('/api/users/edit', data)
        .then(res => {
            console.log('i');
        })
        .catch(err => {
            console.log('ii');
        });
}

function* updateUserData(action) {
    console.log('>> changeUser', action.data.meta, action.data.userID);
    try {
        const response = yield call(updateUserDataPost, action.data);
        yield put(receiveUsers(action.data.userID));
    } catch(e) {
        console.log('ii');
    }
}

function callCurrentUserData(data) {
    console.log('>> data', data);
    return axios.post('/api/users/user', { id: data });
}

function* currentUserData(action) {
    try {
        console.log('>> currentUserData', action);
        const responce = yield call(callCurrentUserData, action.data);
        console.log('>> CUD responce', responce.data);
        yield put(receiveUserData(responce.data));
        // const response = yield call(callCurrentUserData, action.data);
        // console.log('>> CUD', response);
        // yield put(setCurrentUser(response.data))
        // const data = yield call(() => { return fetch('https://dog.ceo/api/breeds/image/random').then(res => res.json()) } );
    } catch(e) {
        console.log('>> currentUserData ERROR', action);
    }
}



// ------------------------- // ------------------------- // -------------------------

function* watcher() {
    yield takeLatest(REQUEST_USERS, getUsers);
    yield takeLatest(ADD_USER, addNewUser);
    yield takeLatest(LOGIN, userLogin);
    yield takeLatest(LOGOUT, logout);
    yield takeLatest(UPDATE_USER, updateUserData);
    yield takeLatest(SET_USER_STATUS, userStatus);
    yield takeLatest(REQUEST_USER_DATA, currentUserData);

}

export default function* saga() {
    yield all([watcher()]);
}