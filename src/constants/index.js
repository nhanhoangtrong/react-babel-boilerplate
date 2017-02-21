import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from '../store/configureStore'
import storage from '../libs/storage'

export const APP_STORAGE = 'app_name'

export function serialize(state = {}) {
	const serializedState = {}

	Object.keys(state).forEach( k => serializedState[k] = state[k].toJS ? state[k].toJS() : state[k])

	return serializedState
}

export function deserialize(state = {}) {
	const deserializedState = {}
	Object.keys(state).forEach( k => deserializedState[k] = fromJS(state[k]))

	return deserializedState
}

export const store = configureStore()

const deserializedState = deserialize(storage.get(APP_STORAGE))

export const history = syncHistoryWithStore(browserHistory, store)

store.subscribe(() => {
	if(!storage.get('debug')) {
    	storage.set(APP_STORAGE, serialize(store.getState()));
	}
})