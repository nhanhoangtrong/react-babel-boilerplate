import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './components/App.jsx';
require('./index.html');

const render = (id) => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById(id)
  );
};

render('app');
render('app2');

if (module.hot)
{
  module.hot.accept('./components/App.jsx', render);
}
