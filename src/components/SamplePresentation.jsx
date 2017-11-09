import React from 'react';
import PropTypes from 'prop-types';
import style from '@app/stylus/main.styl';
import SampleStaggeredMotion from './SampleStaggeredMotion';
import SampleTransitionMotion from './SampleTransitionMotion';
import fa from 'font-awesome/css/font-awesome.css';

const SamplePresentation = (props) => {
    return (
        <div className={style.app}>hello aa bb ccss ak ak u that terible ops!!!
            <button onClick={props.onClickToggleText.bind(props, props.isShownText)}>{props.isShownText ? 'Hide Text' : 'Show Text'}<i className={fa.fa + ' ' + fa['fa-flag']} /></button>
            <SampleTransitionMotion />
            <p style={{
                fontFamily: 'Slabo',
                fontWeight: 'normal',
            }}>This is a Slabo</p>
        </div>
    );
};

SamplePresentation.propTypes = {
    isShownText: PropTypes.bool.isRequired,
    onClickToggleText: PropTypes.func.isRequired,
};

export default SamplePresentation;
