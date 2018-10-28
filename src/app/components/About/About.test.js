import React from 'react';
import About from './index';
import { shallow } from 'enzyme';

test('Test About component', () => {
    const wrapper = shallow(<About />);
    expect(wrapper.find('h3').length).toEqual(1);
});
