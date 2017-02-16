export const GLOBAL_SHOW_MAIN = 0
export const GLOBAL_HIDE_MAIN = 1

export function showMain() {
	return {
		type: GLOBAL_SHOW_MAIN
	}
}

export function hideMain() {
	return {
		type: GLOBAL_HIDE_MAIN
	}
}