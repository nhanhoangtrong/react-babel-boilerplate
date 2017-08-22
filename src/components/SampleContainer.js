import React from 'react';
import { connect } from 'react-redux';
import { showMain, hideMain } from '../actions/globals';
import SamplePresentation from './SamplePresentation';

const mapStateToProps = (state) => ({
	isShownText: state.globals.get('isShownMain'),
});

const mapDispatchToProps = (dispatch) => ({
	onClickToggleText: (isShownText) => {
		if (isShownText) {
			dispatch(hideMain());
		} else {
			dispatch(showMain());
		}
	},
});
export default connect(mapStateToProps, mapDispatchToProps)(SamplePresentation);
