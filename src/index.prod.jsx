import React from 'react';
import ReactDOM from 'react-dom';
import Root from './modules/Root';
import { store, syncHistory } from './store';

// React 16 using hydrate for better server-side render performance
ReactDOM.hydrate(
    <Root store={store} history={syncHistory} />,
    document.getElementById('root')
);
