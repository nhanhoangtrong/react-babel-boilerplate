import { GLOBAL_SHOW_MAIN, GLOBAL_HIDE_MAIN } from './Actions'

import Immutable from 'immutable'

export default (globals = Immutable.Map({isShownMain: false}), action) => {
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