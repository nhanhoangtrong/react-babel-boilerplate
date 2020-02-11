import React from 'react';
import { shallow } from 'enzyme';
import SamplePage from './index';

test('Test SamplePage', () => {
    shallow(
        <SamplePage
            isShownText
            toggleText={(isShown) => {
                console.log('toggled', { isShown });
            }}
        />
    );
});
