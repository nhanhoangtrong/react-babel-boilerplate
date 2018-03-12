import React from 'react';
import App from './index';
import { shallow } from 'enzyme';

test('Test App Component', () => {
    const wrapper = shallow(
        <App>
            <p>Hello World!</p>
        </App>
    );
    expect(wrapper.contains(<p>Hello World!</p>)).toBeTruthy();
});
