import React from 'react';
import { createRoutes, Route, IndexRoute } from 'react-router';
import App from '@app/components/App';
import SampleApp from '@app/containers/SampleApp';
import About from '@app/components/About';

export default createRoutes([
    <Route key="main" path="/" component={App}>
        <IndexRoute component={SampleApp} />
        <Route path="/about" component={About} />
    </Route>
]);
