import { hashHistory } from 'react-router'
import configureStore from '../store/configureStore'
import storage from '../libs/storage'

export const history = hashHistory

export const APP_STORAGE = 'app_name'

export function serialize(state = {}) {
	const serializedState = {}

	Object.keys(state).forEach( k => serializedState[k] = state[k].toJS())

	return serializedState
}

export function deserialize(state = {}) {
	const deserializedState = {}
	Object.keys(state).forEach( k => deserializedState[k] = fromJS(state[k]))

	return deserializedState
}

export const store = configureStore(deserialize(storage.get(APP_STORAGE)))

store.subscribe(() => {
	if(!storage.get('debug')) {
    	storage.set(APP_STORAGE, serialize(store.getState()));
	}
})