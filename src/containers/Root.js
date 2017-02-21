
if (process.env.NODE_ENV === 'production') {
	const ProdRoot = require('./Root.prod')
	module.exports = ProdRoot
} else {
	const DevRoot = require('./Root.dev')
	module.exports = DevRoot
}