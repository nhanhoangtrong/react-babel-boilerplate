import { createStore } from 'redux';
import createRootReducer from './createRootReducer';
import enhancer from './enhancer';

export default function configureStore(initialState, history) {
    return createStore(createRootReducer(history), initialState, enhancer);
}
