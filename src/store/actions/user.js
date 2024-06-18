import { USER_LOGGED_IN } from "./actionTypes";
import { USER_LOGGED_OUT } from "./actionTypes";

export const login = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    };
};

export const logout = () => {
    return {
        type: USER_LOGGED_OUT
    };
};