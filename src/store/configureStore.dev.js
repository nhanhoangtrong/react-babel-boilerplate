import { createStore, compose } from 'redux'
import rootReducer from '../reducers'

// const createStoreWithMiddleware = compose(
// 	persistState(getDebugSessionKey())
// )(createStore)

function getDebugSessionKey() {
	const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
	return (matches && matches.length > 0) ? matches[1] : null
}

export default function configureStore(initialState) {
	/* eslint-disable no-underscore-dangle */
	const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
	/* eslint-enable */

	if (module.hot) {
		// Enable Webpack for HMR for reducers
		module.hot.accept('../reducers', () => {
			try {
				const nextReducer = require('../reducers/index').default
				store.replaceReducer(nextReducer)	
			} catch (err) {
				console.log(err)
			}
			
		})
	}

	return store
}