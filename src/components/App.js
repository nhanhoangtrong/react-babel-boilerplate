import React from 'react'
import { Provider } from 'react-redux'
import store from 'store'
import { Router, Route, hashHistory } from 'react-router'
import SampleComponent from 'components/SampleComponent'

export default (props) => (
    <Provider store={store}>
    	<Router history={hashHistory}>
    		<Route path="/" components={SampleComponent} />
    	</Router>
    </Provider>
)
