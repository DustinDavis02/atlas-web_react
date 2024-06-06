import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import { HeaderComponent } from './Header'; // Import the non-connected component directly
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);

describe('Header', () => {
  let store;
  let mockLogOut;

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    mockLogOut = jest.fn();

    store = mockStore({
      user: { isLoggedIn: false, email: '' }
    });
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  const shallowWithStore = (component, store) => {
    const context = {
      store,
    };
    return shallow(<Provider store={store}>{component}</Provider>, { context }).dive().dive();
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<HeaderComponent user={{ isLoggedIn: false }} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('does not render logout section when user is not logged in', () => {
    const wrapper = shallow(<HeaderComponent user={{ isLoggedIn: false }} />);
    expect(wrapper.find('#logoutSection').exists()).toBe(false);
  });

  it('renders logout section when user is logged in', () => {
    const wrapper = shallow(<HeaderComponent user={{ isLoggedIn: true, email: 'test@test.com' }} logout={mockLogOut} />);
    expect(wrapper.find('#logoutSection').exists()).toBe(true);
  });

  it('calls logOut when logout button is clicked', () => {
    const wrapper = shallow(<HeaderComponent user={{ isLoggedIn: true, email: 'test@test.com' }} logout={mockLogOut} />);
    wrapper.find('#logoutSection button').simulate('click');
    expect(mockLogOut).toHaveBeenCalled();
  });
});
