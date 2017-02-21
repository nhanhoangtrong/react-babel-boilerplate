import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router'
import { history } from '../constants'
import routes from '../routes'

export default (props) => (
	<Router routes={routes} history={history} />
)