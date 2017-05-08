import React from 'react'
import PropTypes from 'prop-types'
import style from '../stylus/main.styl'
import { IndexLink, Link } from 'react-router'

const App = (props) => (
	<div className={style.app}>
		<ul className={style.nav}>
			<li><IndexLink to="/">Index</IndexLink></li>
			<li><Link to="/about">About me</Link></li>
		</ul>
		<div className={style.main}>
			{props.children}
		</div>
	</div>
)

App.propTypes = {
	children: PropTypes.object.isRequired
}

export default App
