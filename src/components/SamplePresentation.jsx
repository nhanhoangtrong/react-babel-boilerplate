import React from 'react';
import PropTypes from 'prop-types';
import style from '@app/stylus/main.styl';
import SampleStaggeredMotion from './SampleStaggeredMotion';
import spinner from '@app/img/spinner.gif';
import fa from 'font-awesome/css/font-awesome.css';

const SamplePresentation = (props) => {
    return (
		<div className={style.app}>hello aa bb ccss ak ak u that terible ops!!!
			<button onClick={props.onClickToggleText.bind(props, props.isShownText)}>{props.isShownText ? 'Hide Text' : 'Show Text'}<i className={fa.fa + ' ' + fa['fa-flag']} /></button>
			<SampleStaggeredMotion visible={props.isShownText} />
            <img src={spinner} alt="Loading..."/>
		</div>
    );
};

SamplePresentation.propTypes = {
    isShownText: PropTypes.bool.isRequired,
    onClickToggleText: PropTypes.func.isRequired,
};

export default SamplePresentation;
