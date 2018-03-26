import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import sampleApp from '@app/modules/SampleApp/reducer';

export default combineReducers({
    sampleApp,
    routing,
});
