import React from 'react';
import { shallow } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import { Notifications, mapStateToProps } from './Notifications';
import NotificationItem from './NotificationItem';
import { fromJS, Map } from 'immutable';
import { getUnreadNotifications } from '../selectors/notificationSelectors';
import { fetchNotifications, markAsRead } from '../actions/notificationActionCreators';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

jest.mock('../selectors/notificationSelectors');
jest.mock('../actions/notificationActionCreators');

const mockStore = configureMockStore([thunk]);

describe('Notifications', () => {
  let wrapper;
  let store;
  const mockHandleDisplayDrawer = jest.fn();
  const mockHandleHideDrawer = jest.fn();
  const mockFetchNotifications = jest.fn();
  const mockMarkAsRead = jest.fn();

  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
    store = mockStore({
      notifications: fromJS({
        notifications: {},
      }),
    });

    act(() => {
      wrapper = shallow(
        <Provider store={store}>
          <Notifications 
            handleDisplayDrawer={mockHandleDisplayDrawer}
            handleHideDrawer={mockHandleHideDrawer}
            fetchNotifications={mockFetchNotifications}
            markAsRead={mockMarkAsRead}
          />
        </Provider>
      );
    });
    wrapper.update();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    jest.clearAllMocks();
  });

  it('renders without crashing with no props', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly if listNotifications is empty', () => {
    act(() => {
      wrapper.setProps({ listNotifications: Map() });
    });
    wrapper.update();
    expect(wrapper.find(NotificationItem).length).toBe(0);
    expect(wrapper.text()).toContain("No new notification for now");
    expect(wrapper.text()).not.toContain("Here is the list of notifications");
  });

  it('renders correctly if listNotifications property is not passed', () => {
    expect(wrapper.find(NotificationItem).length).toBe(0);
    expect(wrapper.text()).toContain("No new notification for now");
  });

  it('renders NotificationItem components correctly with data', () => {
    const notifications = fromJS({
      '1': { id: 1, type: 'default', value: 'New course available' },
      '2': { id: 2, type: 'urgent', value: 'New resume available' }
    });
    act(() => {
      wrapper.setProps({ listNotifications: notifications });
    });
    wrapper.update();
    expect(wrapper.find(NotificationItem).length).toEqual(notifications.size);
    expect(wrapper.text()).not.toContain("No new notification for now");
    expect(wrapper.text()).toContain("Here is the list of notifications");
  });

  it('calls markAsRead when NotificationItem is clicked', () => {
    const notifications = fromJS({
      '1': { id: 1, type: 'default', value: 'New course available' }
    });
    act(() => {
      wrapper.setProps({ listNotifications: notifications, markAsRead: mockMarkAsRead });
    });
    wrapper.update();
    wrapper.find(NotificationItem).first().props().markAsRead();
    expect(mockMarkAsRead).toHaveBeenCalledWith(1);
  });

  it('calls handleDisplayDrawer when menu item is clicked', () => {
    act(() => {
      wrapper.find('.menuItem').simulate('click');
    });
    wrapper.update();
    expect(mockHandleDisplayDrawer).toHaveBeenCalled();
  });

  it('calls handleHideDrawer when close button is clicked', () => {
    act(() => {
      wrapper.setProps({ displayDrawer: true });
    });
    wrapper.update();
    act(() => {
      wrapper.find('button').simulate('click');
    });
    wrapper.update();
    expect(mockHandleHideDrawer).toHaveBeenCalled();
  });

  it('does not rerender for the same list of notifications', () => {
    const notifications = fromJS({
      '1': { id: 1, type: 'default', value: 'New course available' },
      '2': { id: 2, type: 'urgent', value: 'New resume available' }
    });
    act(() => {
      wrapper.setProps({ listNotifications: notifications });
    });
    wrapper.update();
    const shouldUpdate = wrapper.instance().shouldComponentUpdate({ listNotifications: notifications }, wrapper.state());
    expect(shouldUpdate).toBe(false);
  });

  it('rerenders for a longer list of notifications', () => {
    const initialNotifications = fromJS({
      '1': { id: 1, type: 'default', value: 'New course available' }
    });
    const newNotifications = fromJS({
      ...initialNotifications.toJS(),
      '2': { id: 2, type: 'urgent', value: 'New resume available' }
    });
    act(() => {
      wrapper.setProps({ listNotifications: initialNotifications });
    });
    wrapper.update();
    const shouldUpdate = wrapper.instance().shouldComponentUpdate({ listNotifications: newNotifications }, wrapper.state());
    expect(shouldUpdate).toBe(true);
  });

  it('calls fetchNotifications when component is mounted', () => {
    expect(mockFetchNotifications).toHaveBeenCalled();
  });
});

describe('mapStateToProps', () => {
  it('should return the correct props from state', () => {
    const state = fromJS({
      notifications: {
        notifications: {
          '1': { id: 1, type: 'default', value: 'New course available' },
          '2': { id: 2, type: 'urgent', value: 'New resume available' }
        }
      }
    });
    getUnreadNotifications.mockReturnValue(state.getIn(['notifications', 'notifications']));
    const expectedProps = {
      listNotifications: state.getIn(['notifications', 'notifications'])
    };
    expect(mapStateToProps(state)).toEqual(expectedProps);
  });
});
