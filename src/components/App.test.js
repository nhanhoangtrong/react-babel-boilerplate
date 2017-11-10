import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

test('Test App Component', () => {
    expect(renderer.create(<App><p>Hello</p></App>).toJSON().type).toBe('div');
});
