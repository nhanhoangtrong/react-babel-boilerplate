import { createStore } from 'redux';
import rootReducer from '../reducers';
import enhancer from './enhancer';

export default function configureStore(initialState) {
    /* eslint-disable no-underscore-dangle */
    const createEnhancedStore = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__()(createStore) : createStore;

    const store = enhancer(createEnhancedStore)(rootReducer, initialState);
    /* eslint-enable */

    if (module.hot) {
        // Enable Webpack for HMR for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers/index').default;
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
