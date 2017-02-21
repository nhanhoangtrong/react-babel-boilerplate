import React from 'react'
import { Provider } from 'react-redux'
import App from './App'

export default (props) => {
	return (
		<Provider store={props.store}>
			<App/>
		</Provider>
	)
}