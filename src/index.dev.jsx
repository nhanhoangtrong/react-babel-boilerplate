import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './modules/Root';
import { store, syncHistory } from './store';

const render = (RootComponent) => {
    ReactDOM.render(
        <AppContainer>
            <RootComponent store={store} history={syncHistory} />
        </AppContainer>,
        document.getElementById('root')
    );
};

render(Root);

if (module.hot) {
    module.hot.accept('./modules/Root', () => {
        const NewRoot = require('./modules/Root');
        render(NewRoot);
    });
}
