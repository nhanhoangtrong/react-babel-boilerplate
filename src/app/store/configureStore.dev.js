import { createStore } from 'redux';
import createRootReducer from './createRootReducer';
import enhancer from './enhancer';

export default function configureStore(initialState, history) {
    /* eslint-disable no-underscore-dangle */
    const createEnhancedStore = window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()(createStore)
        : createStore;

    const store = enhancer(createEnhancedStore)(
        createRootReducer(history),
        initialState
    );
    /* eslint-enable */

    if (module.hot) {
        // Enable Webpack for HMR for reducers
        module.hot.accept('./createRootReducer', () => {
            const nextReducer = require('./createRootReducer').default(history);
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
