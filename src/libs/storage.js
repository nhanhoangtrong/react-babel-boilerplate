export default {
	get: (key) => {
		try {
			JSON.parse(localStorage.getItem(key))
		} catch (err) {
			return null
		}
	},
	set: (key, value) => {
		localStorage.setItem(key, JSON.stringify(value))
	}
}