import React from 'react'
import style from '../stylus/main.styl'
import { IndexLink, Link } from 'react-router'

export default (props) => (
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