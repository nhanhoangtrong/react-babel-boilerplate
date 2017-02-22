import { GLOBAL_SHOW_MAIN, GLOBAL_HIDE_MAIN } from '../actions/globals'

import Immutable from 'immutable'

const initialState = Immutable.Map({isShownMain: false, debug: true})

export default (globals = initialState, action) => {
	switch (action.type) {
	case GLOBAL_SHOW_MAIN:
		return globals.set('isShownMain', true)
	case GLOBAL_HIDE_MAIN:
		return globals.set('isShownMain', false)
	default:
		return globals
	}
}