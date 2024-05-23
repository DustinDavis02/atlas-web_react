import React from 'react';
import { mount } from 'enzyme';
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
    mockLogOut = jest.fn();
    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    wrapper = mount(<App logOut={mockLogOut} />);
  });

  afterEach(() => {
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
    expect(mockLogOut).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith('Logging you out');
  });
});