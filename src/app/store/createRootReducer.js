import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import globals from '@src/app/modules/globals/reducer';

export default (history) => {
    return combineReducers({
        globals,
        router: connectRouter(history),
    });
};
