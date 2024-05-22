import React from 'react';
import { mount } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import App from './App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';

describe('App', () => {
  let wrapper;
  let mockLogOut;
  let alertMock;

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    mockLogOut = jest.fn();
    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    wrapper = mount(<App />);
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    alertMock.mockRestore();
  });

  it('renders without crashing', () => {
    expect(wrapper).not.toBeNull();
  });

  it('contains the Notifications component', () => {
    expect(wrapper.find(Notifications).exists()).toBe(true);
  });

  it('contains the Header component', () => {
    expect(wrapper.find(Header).exists()).toBe(true);
  });

  it('contains the Login component', () => {
    expect(wrapper.find(Login).exists()).toBe(true);
  });

  it('contains the Footer component', () => {
    expect(wrapper.find(Footer).exists()).toBe(true);
  });

  it('calls logOut and shows alert on ctrl+h', () => {
    const event = {
      ctrlKey: true,
      key: 'h',
      preventDefault: jest.fn()
    };
    wrapper.instance().handleKeyDown(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith('Logging you out');
  });

  it('has default state displayDrawer as false', () => {
    expect(wrapper.state().displayDrawer).toBe(false);
  });

  it('sets displayDrawer to true when handleDisplayDrawer is called', () => {
    wrapper.instance().handleDisplayDrawer();
    expect(wrapper.state().displayDrawer).toBe(true);
  });

  it('sets displayDrawer to false when handleHideDrawer is called', () => {
    wrapper.instance().handleDisplayDrawer();
    wrapper.instance().handleHideDrawer();
    expect(wrapper.state().displayDrawer).toBe(false);
  });

  it('updates the state correctly when logIn is called', () => {
    wrapper.instance().logIn('test@test.com', 'password');
    expect(wrapper.state().user.email).toBe('test@test.com');
    expect(wrapper.state().user.password).toBe('password');
    expect(wrapper.state().user.isLoggedIn).toBe(true);
  });

  it('updates the state correctly when logOut is called', () => {
    wrapper.instance().logIn('test@test.com', 'password');
    wrapper.instance().logOut();
    expect(wrapper.state().user).toEqual({
      email: '',
      password: '',
      isLoggedIn: false,
    });
  });
});
