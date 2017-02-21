import React from 'react'
import style from '../stylus/main.styl'

export default (props) => {
	return (
	<div id="appWrapper">
		<div className={style.app}>hello aa bb
			<div>{ props.isShownText ? "Hello World!" : "" }</div>
			<button onClick={props.onClickToggleText.bind(props, props.isShownText)}>{props.isShownText ? "Hide Text" : "Show Text"}</button>
		</div>
	</div>
)}