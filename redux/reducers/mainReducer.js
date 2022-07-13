import { combineReducers } from 'redux';
import cityReducer from './cityReducer';
import itineraryReducer from './itineraryReducer';
import userReducer from './userReducer';
import dataReducer from './dataReducer';

const mainReducer = combineReducers({
    cityReducer,
    itineraryReducer,
    userReducer,
    dataReducer
});

export default mainReducer;