const initState = {
    isLoggedIn: false,
    currentUser: 'admin?',
    access: 0,
    loading: false,
    userID: null
};

const reducer = (state = initState, action) => {
    console.log('STATE', state);
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                loading: true
            };
        case 'USERS_RECEIVED':
            return {
                ...state,
                loading: false,
                users: action.json[0]
            };
        case 'ADD_USER':
            return {
                ...state,
                loading: false,
            };
        case 'LOGIN':
            console.log('>> actions', action);
            return {
                ...state,
                userID: '1212'
            };
        default:
            return state;
    }
};

export default reducer;