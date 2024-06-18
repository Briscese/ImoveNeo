import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user';

const reducer = combineReducers({
    user: userReducer, // Corrigido para 'user'
});

const storeConfig = () => {
    return configureStore({ reducer });
}

export default storeConfig;
