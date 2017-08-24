import React from 'react';
import PropTypes from 'prop-types';
import { StaggeredMotion, spring } from 'react-motion';

export default class SampleStaggeredMotion extends React.Component {
	render() {
		const { visible } = this.props;
		return (
			<StaggeredMotion
				defaultStyles={[
					{
						height: visible ? 0 : 100,
					},
					{
						height: visible ? 0 : 100,
					},
				]}
				styles={prevInterpolatedStyle => prevInterpolatedStyle.map((_, i) => {
					return i === (visible ? 0 : 1) ? { height: spring(visible ? 100 : 0), } : { height: spring(prevInterpolatedStyle[visible ? 0 : 1].height) };
				})}>
				{
					interpolatedStyles => (
						<div>
							{interpolatedStyles.map((style, i) =>
                                <div key={i} style={{ height: style.height, backgroundColor: i === 0 ? 'blue' : 'green', }} />
							)}
						</div>
					)
				}

			</StaggeredMotion>
		);
	}
}

SampleStaggeredMotion.propTypes = {
	visible: PropTypes.bool.isRequired,
};
