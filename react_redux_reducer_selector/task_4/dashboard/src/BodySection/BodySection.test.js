import React from 'react';
import { shallow } from 'enzyme';
import BodySection from './BodySection';

describe('BodySection', () => {
  it('renders correctly with children and a title', () => {
    const wrapper = shallow(
      <BodySection title="test title">
        <p>test children node</p>
      </BodySection>
    );

    expect(wrapper.find('h2').text()).toEqual('test title');

    expect(wrapper.find('p').text()).toEqual('test children node');
  });
});