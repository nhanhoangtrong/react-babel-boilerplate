import React from 'react';
import { connect } from 'react-redux';
import { showMain, hideMain } from './actions';
import SamplePresentation from '@app/components/SamplePresentation';

const mapStateToProps = (state) => ({
    isShownText: state.sampleApp.get('isShownMain'),
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
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SamplePresentation);
