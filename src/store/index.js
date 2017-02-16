import { createStore, combineReducers } from 'redux'
import globalReducer from './global/Reducer'

export default createStore(combineReducers({
	globals: globalReducer
}))