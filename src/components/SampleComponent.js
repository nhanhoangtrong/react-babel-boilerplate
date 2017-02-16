import React from 'react'
import { connect } from 'react-redux'
import { showMain, hideMain } from 'store/global/Actions'

const mapStateToProps = (state, ownProps) => ({
	isShownText: state.globals.get('isShownMain')
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	onClickToggleText: function (isShownText) {
		if (isShownText) {
			dispatch(hideMain())
		} else {
			dispatch(showMain())
		}
	}
})
export default connect(mapStateToProps, mapDispatchToProps)((props) => {
	return (
	<div>
		<div>{ props.isShownText ? "Hello World!" : "" }</div>
		<button onClick={props.onClickToggleText.bind(props, props.isShownText)}>{props.isShownText ? "Hide Text" : "Show Text"}</button>
	</div>
)})