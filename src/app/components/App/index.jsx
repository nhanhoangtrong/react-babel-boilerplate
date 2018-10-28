import React from 'react';
import PropTypes from 'prop-types';
import styles from './App.styl';
import { IndexLink, Link } from 'react-router';

const App = ({ children }) => (
    <div className={styles.app}>
        <ul className={styles.nav}>
            <li>
                <IndexLink to="/">Index</IndexLink>
            </li>
            <li>
                <Link to="/about">About me</Link>
            </li>
        </ul>
        <div className={styles.main}>{children}</div>
    </div>
);

App.propTypes = {
    children: PropTypes.object.isRequired,
};

export default App;
