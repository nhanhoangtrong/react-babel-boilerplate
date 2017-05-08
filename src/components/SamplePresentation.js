import React from 'react'
import PropTypes from 'prop-types'
import style from '../stylus/main.styl'

const SamplePresentation = (props) => {
	return (
		<div className={style.app}>hello aa bb ccss ak ak u that terible ops!!!
			<div>{ props.isShownText ? 'Hello World!' : '' }</div>
			<button onClick={props.onClickToggleText.bind(props, props.isShownText)}>{props.isShownText ? 'Hide Text' : 'Show Text'}</button>
		</div>
	)
}

SamplePresentation.propTypes = {
	isShownText: PropTypes.bool.isRequired,
	onClickToggleText: PropTypes.func.isRequired
}

export default SamplePresentation
