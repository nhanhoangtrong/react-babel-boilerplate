import React from 'react'
import style from '../stylus/main.styl'
import { Link } from 'react-router'

export default (props) => {
	return (
		<div className={style.app}>hello aa bb ccss ak ak u that terible ops
			<div>{ props.isShownText ? "Hello World!" : "" }</div>
			<button onClick={props.onClickToggleText.bind(props, props.isShownText)}>{props.isShownText ? "Hide Text" : "Show Text"}</button>
		</div>
	)
}