import setAuthToken from "../../utils/setAuthToken";

export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export const REQUEST_USER_DATA = 'REQUEST_USER_DATA';
export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const ADD_USER = 'ADD_USER';
export const ADD_USER_ERROR = 'ADD_USER_ERROR';
export const UPDATE_USER_STATUS = 'UPDATE_USER_STATUS';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER = 'UPDATE_USER';
export const RECEIVE_USER_UPDATE = 'RECEIVE_USER_UPDATE';
export const SET_CURRENT_USER_DATA = 'SET_CURRENT_USER_DATA';
export const SET_USER_STATUS = 'SET_USER_STATUS';
export const SET_USER_STATUS_SUCCESS = 'SET_USER_STATUS_SUCCESS';


// ------------------------------
export const requestUsers = (data) =>
    ({ type: REQUEST_USERS, data: data });

export const receiveUsers = data => {
    return ({ type: RECEIVE_USERS, data: data });
};
// ------------------------------


// ------------------------------
export const requestUserData = (data) =>
    ({ type: REQUEST_USER_DATA, data });

export const receiveUserData = (data) =>  {
    return ({ type: RECEIVE_USER_DATA, data });
};
// ------------------------------


// ------------------------------
 const setCurrentUser = (data) => {
    return ({ type: SET_CURRENT_USER, data });
};

export const setUserData = (data) => {
    return ({ type: SET_CURRENT_USER_DATA, data });
};

export const addUser = (data) => {
    return ({ type: ADD_USER, data });
};

export const addUserError = (data) => {
    return ({ type: ADD_USER_ERROR, data });
};

export const updateUserStatus = (data) => {
    return ({ type: UPDATE_USER_STATUS, data });
};
// ------------------------------


// ------------------------------
export const login = (data) => {
    console.log('>> actions Login', data);
    return ({ type: LOGIN, data });
};

export const loginSuccess = (data) => {
    console.log('>> actions loginSuccess', data);
    return ({ type: LOGIN_SUCCESS, data });
};

export const loginError = (data) => {
    return ({ type: LOGIN_ERROR, data });
};
// ------------------------------


// ------------------------------
export const logout = () => {
    return ({ type: LOGOUT })
};

// ------------------------------
export const getCurrentUserData = (data) => {
    return ({ type: SET_CURRENT_USER_DATA, data });
};

export const setUserStatus = (data) => {
    return ({ type: SET_USER_STATUS, data })
};

export const setUserStatusSuccess = (data) => {
    return ({ type: SET_USER_STATUS_SUCCESS, data })
};

export const updateUser = (data) => {
    return ({ type: UPDATE_USER, data });
};

export const updateUserSuccess = (data) => {
    return ({ type: REQUEST_USERS, data: data });
};

export default setCurrentUser;

// export const userLogin = data => {
//     return
// };
