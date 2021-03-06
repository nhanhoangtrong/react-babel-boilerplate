import React from 'react';
import PropTypes from 'prop-types';

const SamplePresentation = ({ toggleText, isShownText }) => {
    return (
        <div>
            hello aa bb ccss ak ak u that terible ops!!!
            <button onClick={() => toggleText(isShownText)}>
                {isShownText ? 'Hide Text' : 'Show Text'}
            </button>
            {isShownText && <p>This is a Slabo</p>}
        </div>
    );
};

SamplePresentation.propTypes = {
    isShownText: PropTypes.bool.isRequired,
    toggleText: PropTypes.func.isRequired,
};

export default SamplePresentation;
