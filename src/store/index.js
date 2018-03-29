import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { fromJS } from 'immutable';
import configureStore from './configureStore';
import storage from '@app/libs/storage';
import { APP_STORAGE } from '@app/globals';

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
 * @param {boolean} immutable
 * @returns {object}
 */
export function deserialize(objectState, immutable) {
    const deserializedState = {};

    Object.keys(objectState || {}).forEach((k) => {
        deserializedState[k] = fromJS(objectState[k]);
    });

    return deserializedState;
}

const deserializedState = deserialize(storage.get(APP_STORAGE));

export const store = configureStore(deserializedState);

export const syncHistory = syncHistoryWithStore(browserHistory, store);

store.subscribe(() => {
    if (!storage.get('debug')) {
        storage.set(APP_STORAGE, serialize(store.getState()));
    }
});
