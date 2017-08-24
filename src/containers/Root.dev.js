import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '@app/routes';

// key={Math.random()} obviously it changes all components states to their default states

export default class Root extends Component {
	render() {
		const { store, history } = this.props;
		return (
			<Provider store={store}>
				<Router key={Math.random()} history={history}>
					{routes}
				</Router>
			</Provider>
		);
	}
}

Root.propTypes = {
	store: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
};
