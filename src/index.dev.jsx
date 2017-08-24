import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { store, syncHistory } from './store';

const render = (RootComponent) => {
    ReactDOM.render(
        <AppContainer>
            <RootComponent store={store} history={syncHistory} />
        </AppContainer>,
        document.getElementById('app')
    );
};

render(Root);

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        const NewRoot = require('./containers/Root');
        render(NewRoot);
    });
}
