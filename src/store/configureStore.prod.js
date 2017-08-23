import { createStore } from 'redux';
import rootReducer from '../reducers';
import enhancer from './enhancer';

export default function configureStore(initialState) {
	return createStore(rootReducer, initialState, enhancer);
}
