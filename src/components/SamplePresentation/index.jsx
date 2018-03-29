import React from 'react';
import PropTypes from 'prop-types';

const SamplePresentation = ({ onClickToggleText, isShownText }) => {
    return (
        <div>
            hello aa bb ccss ak ak u that terible ops!!!
            <button onClick={() => onClickToggleText(isShownText)}>
                {isShownText ? 'Hide Text' : 'Show Text'}
            </button>
            {isShownText && <p>This is a Slabo</p>}
        </div>
    );
};

SamplePresentation.propTypes = {
    isShownText: PropTypes.bool.isRequired,
    onClickToggleText: PropTypes.func.isRequired,
};

export default SamplePresentation;
