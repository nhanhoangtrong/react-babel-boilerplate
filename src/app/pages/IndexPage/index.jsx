import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Sample } from './components';

class IndexPage extends PureComponent {
    static propTypes = {
        router: PropTypes.any,
        location: PropTypes.any,
    };

    constructor(props, ctx) {
        super(props, ctx);

        this.state = {};
    }

    render() {
        return (
            <div id="index-page">
                <Sample />
            </div>
        );
    }
}

export default IndexPage;
