import React from 'react';
import ReactDOM from 'react-dom';
import App from '@src/app';
import { store, history } from '@src/app/store';

// React 16 using hydrate for better server-side render performance
ReactDOM.hydrate(
    <App store={store} history={history} />,
    document.getElementById('root')
);
