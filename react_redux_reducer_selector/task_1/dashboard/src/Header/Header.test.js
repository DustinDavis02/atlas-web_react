import React from 'react';
import { mount } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import Header from './Header';
import { AppContext, defaultUser } from '../App/AppContext';

describe('Header', () => {
  let wrapper;
  let mockLogOut;

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    mockLogOut = jest.fn();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut: mockLogOut }}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('does not render logout section when user is not logged in', () => {
    wrapper = mount(
      <AppContext.Provider value={{ user: defaultUser, logOut: mockLogOut }}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('#logoutSection').exists()).toBe(false);
  });

  it('renders logout section when user is logged in', () => {
    const user = { email: 'test@test.com', password: 'password', isLoggedIn: true };
    wrapper = mount(
      <AppContext.Provider value={{ user, logOut: mockLogOut }}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('#logoutSection').exists()).toBe(true);
  });

  it('calls logOut when logout link is clicked', () => {
    const user = { email: 'test@test.com', password: 'password', isLoggedIn: true };
    wrapper = mount(
      <AppContext.Provider value={{ user, logOut: mockLogOut }}>
        <Header />
      </AppContext.Provider>
    );
    wrapper.find('#logoutSection button').simulate('click');
    expect(mockLogOut).toHaveBeenCalled();
  });
});
