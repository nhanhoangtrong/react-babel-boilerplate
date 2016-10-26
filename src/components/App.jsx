import React from 'react';
import style from '../css/custom.styl';

const App = React.createClass({
  render: function() {
    return (
      <div className={style.app}>
        <h1>Hello, World KEndy!</h1>
      </div>
    )
  }
});

export default App;
