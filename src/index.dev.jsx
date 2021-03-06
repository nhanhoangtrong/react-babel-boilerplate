import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from '@src/app';
import { store, history } from '@src/app/store';

const render = (AppComponent) => {
    ReactDOM.render(
        <AppContainer>
            <AppComponent store={store} history={history} />
        </AppContainer>,
        document.getElementById('root')
    );
};

render(App);

if (module.hot) {
    module.hot.accept('@src/app', () => {
        const NewApp = require('@src/app').default;
        render(NewApp);
    });
}
