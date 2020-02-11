import { fromJS } from 'immutable';
import configureStore from './configureStore';
import storage from '@src/app/lib/storage';
import { createBrowserHistory } from 'history';
import { APP_STORAGE } from '@src/globals';

/**
 * Serialize a immutable object to JS Object for saving into local storage
 *
 * @param {object} immutableState
 * @param {object} serializedState
 */
export function serialize(immutableState) {
    const serializedState = {};

    Object.keys(immutableState || {}).forEach((k) => {
        serializedState[k] = immutableState[k].toJS
            ? immutableState[k].toJS()
            : immutableState[k];
    });

    return serializedState;
}

/**
 * Deserialize JS Object into an immutable object
 *
 * @param {object} objectState
 * @param {boolean} isImmutable
 * @returns {object}
 */
export function deserialize(objectState, isImmutable = true) {
    const deserializedState = {};

    Object.keys(objectState || {}).forEach((k) => {
        deserializedState[k] = isImmutable
            ? fromJS(objectState[k])
            : objectState[k];
    });

    return deserializedState;
}

const deserializedState = deserialize(storage.get(APP_STORAGE));

export const history = createBrowserHistory();

export const store = configureStore(deserializedState, history);

store.subscribe(() => {
    if (!storage.get('debug')) {
        storage.set(APP_STORAGE, serialize(store.getState()));
    }
});
