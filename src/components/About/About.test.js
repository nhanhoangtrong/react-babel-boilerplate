import React from 'react';
import About from './index';
import { shallow } from 'enzyme';

test('Test About component', () => {
    shallow(<About />);
});
