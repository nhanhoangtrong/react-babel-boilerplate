import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import globals from './globals';

export default combineReducers({
    globals,
    routing
});
