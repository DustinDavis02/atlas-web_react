import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Footer from './Footer';
import { Provider } from 'react-redux';

const mockStore = configureStore([thunk]);

describe('Footer', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: { isLoggedIn: false, email: '' },
    });
  });

  const shallowWithStore = (component) => {
    const context = { store };
    return shallow(<Provider store={store}>{component}</Provider>, { context }).dive();
  };

  it('renders without crashing', () => {
    const wrapper = shallowWithStore(<Footer />);
    expect(wrapper.exists()).toBe(true);
  });

  it('does not render contact link when user is logged out', () => {
    const wrapper = shallowWithStore(<Footer user={{ isLoggedIn: false }} />);
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it('renders contact link when user is logged in', () => {
    const wrapper = shallowWithStore(<Footer user={{ isLoggedIn: true, email: 'test@test.com' }} />);
    expect(wrapper.find('a').exists()).toBe(true);
    expect(wrapper.find('a').text()).toBe('Contact us');
  });
});
