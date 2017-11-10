import React from 'react';
import About from './About';
import renderer from 'react-test-renderer';

test('Test About component', () => {
    const component = renderer.create(<About />);
    const tree = component.toJSON();
    expect(tree.type).toBe('h3');
});
