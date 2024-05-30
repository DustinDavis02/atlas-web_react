import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection';

describe('BodySectionWithMarginBottom', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

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

    expect(wrapper.find('div').hasClass(/css-/)).toBe(true);
  });
});
