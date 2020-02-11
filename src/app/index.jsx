import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import IndexPage from '@src/app/pages/IndexPage';

const App = ({ store, history }) => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/" exact component={IndexPage} />
                </Switch>
            </ConnectedRouter>
        </Provider>
    );
};

App.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default App;
