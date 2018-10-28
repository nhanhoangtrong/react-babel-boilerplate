import React from 'react';
import { createRoutes, Route, IndexRoute } from 'react-router';
import App from '@src/app/components/App';
import SampleApp from '@src/app/modules/SampleApp';
import About from '@src/app/components/About';

export default createRoutes([
    <Route key="main" path="/" component={App}>
        <IndexRoute component={SampleApp} />
        <Route path="/about" component={About} />
    </Route>,
]);
