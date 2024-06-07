import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection';
import { StyleSheet, css } from 'aphrodite';

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

    const div = wrapper.find('div').first();
    const className = div.prop('className');
    expect(className).toContain(css(StyleSheet.create({ margin: { marginBottom: '40px' } }).margin));
  });
});
