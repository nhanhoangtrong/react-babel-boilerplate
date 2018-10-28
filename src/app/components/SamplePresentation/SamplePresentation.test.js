import React from 'react';
import { shallow } from 'enzyme';
import SamplePresentation from './index';

test('Test SamplePresentation', () => {
    shallow(<SamplePresentation isShownText onClickToggleText={() => {}} />);
});
