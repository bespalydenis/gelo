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
    loginError, receiveUserData,addUserError, setUserStatusSuccess
} from '../actions';
import axios from 'axios'
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";


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
    console.log('>> CSUS', data);
    axios.post('/api/users/updateStatus', { id: data.id, status: data.status }).then(res => {
        console.log('>> gooood');
    }).catch(error => {
        console.log('>> baad', error);
    });
}

function* userStatus(action) {
    console.log('>> userStatus', action.data);
    try {
        const responce = yield call(callSetUserStatus, action.data);
        console.log('>> resp', responce);
        //yield put(userStatusUpdated(action.data));

        const responceInfo = yield call(callCurrentUserData, action.data.id);
        if(responceInfo) {
            yield put(setUserStatusSuccess(responceInfo))
        }
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

        let updatedResponce = {
            errors: {
                ...responce.data.errors,
                meta: {
                    email: action.data.email,
                    firstName: action.data.firstName,
                    lastName: action.data.lastName,
                }
            }
        };

        if (responce && responce.data.errors) {
            yield put(addUserError(updatedResponce))
        } else if (responce) {
            yield put(login(loginData));
        }
        console.log('>> ANU', (responce.data.errors));
    } catch(e) {
        console.log(e);
    }
}
// -------------------------

// -------------------------
function callLogin(data) {
    return axios.post('/api/users/login', {email: data.email, password: data.password});
}

function callLoginAuth(data){
    return axios.post('/api/users/loginAuth', { email: data.email });
}

function* userLogin(action) {
    try {
        let responce;
        console.log('>> is', action.data.isGoogleAuth);
        if(action.data.isGoogleAuth) {
            responce = yield call(callLoginAuth, action.data);
            responce = yield responce.data;
        } else {
            responce = yield call(callLogin, action.data);
            responce = yield responce.data;
        }

        if(responce && responce.errors) {
            yield put(loginError(responce));
        } else if (responce) {
            let responceInfo = {
                token: responce.token,
                user: {}
            };
            localStorage.setItem('jwtToken', responce.token);
            setAuthToken(responce.token);

            let tokenInfo = jwt_decode(responceInfo.token);

            responceInfo.user = yield call(callCurrentUserData, tokenInfo.id);
            if(responceInfo.user) {
                yield put(loginSuccess(responceInfo))
            }
        } else {
            console.log('nhr', responce);
        }
    } catch(e) {
        console.log('>> Login Error', e);
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
    return axios.post('/api/users/user', { id: data });
}

function* currentUserData(action) {
    try {
        const responce = yield call(callCurrentUserData, action.data);
        console.log('>> responce CUD', responce.data, responce.data.status);
        yield put(receiveUserData(responce.data));
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