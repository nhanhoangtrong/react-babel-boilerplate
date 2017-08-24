import React from 'react';
import { createRoutes, Route, IndexRoute } from 'react-router';
import App from '@app/components/App';
import SampleContainer from '@app/containers/SampleContainer';
import About from '@app/components/About';

export default createRoutes([
	<Route path="/" component={App}>
		<IndexRoute component={SampleContainer} />
		<Route path="/about" component={About} />
	</Route>
]);
