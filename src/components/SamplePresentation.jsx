import React from 'react';
import PropTypes from 'prop-types';
import style from '@app/stylus/main.styl';
import SampleStaggeredMotion from './SampleStaggeredMotion';

const SamplePresentation = (props) => {
    return (
		<div className={style.app}>hello aa bb ccss ak ak u that terible ops!!!
			<button onClick={props.onClickToggleText.bind(props, props.isShownText)}>{props.isShownText ? 'Hide Text' : 'Show Text'}</button>
			<SampleStaggeredMotion visible={props.isShownText} />
		</div>
    );
};

SamplePresentation.propTypes = {
    isShownText: PropTypes.bool.isRequired,
    onClickToggleText: PropTypes.func.isRequired,
};

export default SamplePresentation;
