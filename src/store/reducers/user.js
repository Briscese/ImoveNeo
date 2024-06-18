// store/reducers/user.js
import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../actions/actionTypes';

const initialState = {
    name: null,
    email: null,
    endereco: null,
    telefonecelular: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            console.log("USER_LOGGED_IN action payload:", action.payload);
            return {
                ...state,
                ...action.payload
            };
        case USER_LOGGED_OUT:
            console.log("USER_LOGGED_OUT action");
            return initialState;
        default:
            return state;
    }
};

export default reducer;
