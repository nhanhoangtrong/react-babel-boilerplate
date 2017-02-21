import React from 'react'
import { createRoutes, Route } from 'react-router'
import SampleContainer from '../components/SampleContainer'

export default createRoutes([
	<Route path="/" component={SampleContainer} />
])