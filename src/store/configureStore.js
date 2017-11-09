module.exports = process.env.NODE_ENV === 'development' ? require('./configureStore.dev') : require('./configureStore.prod');
