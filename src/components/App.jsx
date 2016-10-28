import React from 'react';
import style from '../css/custom.styl';

const App = React.createClass({
    getInitialState: function() {
        return {test: 123};
    },
    render: function() {
        return (
          <div className={style.app}>
            <h1>Hello, World KEndy! {this.state.test}</h1>
          </div>
        );
    }
});

export default App;
