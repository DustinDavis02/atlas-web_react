import React from 'react';
import { mount } from 'enzyme';
import Footer from './Footer';
import { AppContext, defaultUser } from '../App/AppContext';
import { StyleSheetTestUtils } from 'aphrodite';

describe('Footer', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('does not render contact link when user is logged out', () => {
    const wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it('renders contact link when user is logged in', () => {
    const user = { email: 'test@test.com', password: 'password', isLoggedIn: true };
    const wrapper = mount(
      <AppContext.Provider value={{ user }}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find('a').exists()).toBe(true);
    expect(wrapper.find('a').text()).toBe('Contact us');
  });
});
