if (process.env.NODE_ENV === 'production') {
	const prodConfig = require('./configureStore.prod')
	module.exports = prodConfig
} else {
	const devConfig = require('./configureStore.dev')
	module.exports = devConfig
}
