import React from 'react';
import { shallow } from 'enzyme';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection';

describe('BodySectionWithMarginBottom', () => {
  it('renders BodySection with correct props and styles', () => {
    const wrapper = shallow(
      <BodySectionWithMarginBottom title="test title">
        <p>test child</p>
      </BodySectionWithMarginBottom>
    );

    const bodySection = wrapper.find(BodySection);
    expect(bodySection.exists()).toBe(true);

    expect(bodySection.props().title).toEqual('test title');
    expect(bodySection.props().children.type).toEqual('p');
    expect(bodySection.props().children.props.children).toEqual('test child');

    expect(wrapper.find('.bodySectionWithMargin').exists()).toBe(true);
  });
});
