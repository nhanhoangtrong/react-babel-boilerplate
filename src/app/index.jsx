import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '@src/app/routes';

// key={Math.random()} obviously it changes all components states to their default states
const App = ({ store, history }) => {
    return (
        <Provider store={store}>
            <Router key={Math.random()} history={history}>
                {routes}
            </Router>
        </Provider>
    );
};

App.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default App;
