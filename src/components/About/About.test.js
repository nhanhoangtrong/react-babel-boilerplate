import React from 'react';
import About from './index';
import { shallow } from 'enzyme';

test('Test About component', () => {
    const wrapper = shallow(<About />);
    expect(wrapper.find('div').length).toEqual(1);
});
