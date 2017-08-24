import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import { store, syncHistory } from './store';

ReactDOM.render(<Root store={store} history={syncHistory} />, document.getElementById('app'));
