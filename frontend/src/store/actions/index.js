import setAuthToken from "../../utils/setAuthToken";

export const REQUEST_USERS = 'REQUEST_USERS';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const ADD_USER = 'ADD_USER';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const requestUsers = (data) =>
    ({ type: REQUEST_USERS, data: data });

export const receiveUsers = data => {
    return ({ type: RECEIVE_USERS, data: data });
};

const getCurrentUser = (data) => {
    return ({ type: SET_CURRENT_USER, data });
};

export const addUser = (data) => {
    return ({ type: ADD_USER, data });
};

export const login = (data) => {
    console.log('>> actions Login', data);
    return ({ type: LOGIN, data });
};

export const loginSuccess = (data) => {
    console.log('>> actions loginSuccess', data);
    return ({ type: LOGIN_SUCCESS, data });
};

export const logout = () => {
    // return dispatch => {
    //     localStorage.removeItem('jwtToken');
    //     setAuthToken(false);
    //     dispatch(getCurrentUser({}))
    // }
    return ({ type: LOGOUT })
};


export default getCurrentUser;

// export const userLogin = data => {
//     return
// };
