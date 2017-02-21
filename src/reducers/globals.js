import { GLOBAL_SHOW_MAIN, GLOBAL_HIDE_MAIN } from '../actions/globals'

import Immutable from 'immutable'

const initialState = Immutable.Map({isShownMain: false, debug: true})

export default function globals(globals = initialState, action) {
	switch (action.type) {
		case GLOBAL_SHOW_MAIN:
			globals = globals.set('isShownMain', true)
			return globals
		case GLOBAL_HIDE_MAIN:
			globals = globals.set('isShownMain', false)
			return globals
		default:
			return globals
	}
}