import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {compose} from 'redux';
import {applyMiddleware} from 'redux';
import userReducer from './reducers/user';
import postsReducer from './reducers/posts';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    user: userReducer,
    posts: postsReducer,
});

const storeConfig = () => {
    return configureStore({ reducer });
}

export default storeConfig;
