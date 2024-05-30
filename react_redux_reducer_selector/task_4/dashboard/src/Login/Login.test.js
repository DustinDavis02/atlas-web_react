import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import Login from './Login';

describe('Login', () => {
  let wrapper;

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    wrapper = shallow(<Login />);
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders 2 input tags and 2 label tags', () => {
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find('label').length).toBe(2);
  });

  it('renders a submit button that is disabled by default', () => {
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);
  });

  it('enables the submit button when both inputs are filled', () => {
    wrapper.find('input[type="email"]').simulate('change', { target: { value: 'test@test.com' } });
    wrapper.find('input[type="password"]').simulate('change', { target: { value: 'password' } });
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(false);
  });

  it('disables the submit button when one input is empty', () => {
    wrapper.find('input[type="email"]').simulate('change', { target: { value: 'test@test.com' } });
    wrapper.find('input[type="password"]').simulate('change', { target: { value: '' } });
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);

    wrapper.find('input[type="email"]').simulate('change', { target: { value: '' } });
    wrapper.find('input[type="password"]').simulate('change', { target: { value: 'password' } });
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);
  });
});

