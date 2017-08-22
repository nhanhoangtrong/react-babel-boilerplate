import { GLOBAL_HIDE_MAIN, GLOBAL_SHOW_MAIN } from '../types';

export function showMain() {
	return {
		type: GLOBAL_SHOW_MAIN,
	};
}

export function hideMain() {
	return {
		type: GLOBAL_HIDE_MAIN,
	};
}
