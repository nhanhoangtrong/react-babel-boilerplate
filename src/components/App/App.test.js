import React from 'react';
import App from './index';
import { shallow } from 'enzyme';

test('Test App Component', () => {
    shallow(<App><p>Hello World!</p></App>);
});
