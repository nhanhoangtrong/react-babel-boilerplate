import React from 'react';
import { createRoutes, Route, IndexRoute } from 'react-router';
import App from '../components/App';
import SampleContainer from '../components/SampleContainer';
import About from '../components/About';

export default createRoutes([
	<Route path="/" component={App}>
		<IndexRoute component={SampleContainer} />
		<Route path="/about" component={About} />
	</Route>
]);
