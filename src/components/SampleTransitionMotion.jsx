import React from 'react';
import { TransitionMotion, spring } from 'react-motion';

export default class SampleTransitionMotion extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            items: [
                { key: 'one', height: 100 },
                { key: 'two', height: 100 },
            ],
        };
        this.startThreeTransition = this.startThreeTransition.bind(this);
        this.willThreeEnter = this.willThreeEnter.bind(this);
        this.willThreeLeave = this.willThreeLeave.bind(this);
    }
    componentDidMount() {
        this.startThreeTransition();
    }
    startThreeTransition() {
        this.setState({
            items: [
                { key: 'one', height: 100 },
                { key: 'two', height: 100 },
                { key: 'three', height: 100 },
                // Three will enter
            ],
        });
    }
    willThreeEnter() {
        // When three enter, springs its height to 100
        setTimeout(() => this.setState({
            items: [
                { key: 'one', height: 100 },
                { key: 'two', height: 100 },
                // Three will leave after two seconds
            ],
        }), 2000);
        return {
            height: 0,
        };
    }
    willThreeLeave() {
        return {
            // spring three's height to 0
            height: spring(0),
        };
    }
    render() {
        return (
            <TransitionMotion
                defaultStyles={this.state.items.map(item => ({
                    key: item.key,
                    style: { height: 0 },
                }))}
                willLeave={this.willThreeLeave}
                willEnter={this.willThreeEnter}
                styles={this.state.items.map(item => ({
                    key: item.key,
                    style: { height: spring(item.height) },
                }))}>
                {interpolatedStyles => (
                    <div key={'abc'}>
                        {interpolatedStyles.map(config =>
                            <div key={config.key} style={{ ...config.style, border: '1px solid red' }} />)}
                    </div>
                )}
            </TransitionMotion>
        );
    }
}
