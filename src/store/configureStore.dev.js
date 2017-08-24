import { createStore } from 'redux';
import rootReducer from '../reducers';
import enhancer from './enhancer';

// const createStoreWithMiddleware = compose(
// 	persistState(getDebugSessionKey());
// )(createStore)

function getDebugSessionKey() {
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0) ? matches[1] : null;
}

export default function configureStore(initialState) {
	/* eslint-disable no-underscore-dangle */
    const createEnhancedStore = window.__REDUX_DEVTOOLS_EXTENSION__ ? enhancer(window.__REDUX_DEVTOOLS_EXTENSION__) : enhancer;

    const store = createEnhancedStore(rootReducer, initialState);
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
