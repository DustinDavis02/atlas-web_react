import { Map, fromJS } from 'immutable';
import { filterTypeSelected, getNotifications, getUnreadNotifications } from './notificationSelector';

describe('notification selectors', () => {
  const state = fromJS({
    notifications: {
      filter: 'DEFAULT',
      notifications: {
        '1': { id: 1, type: 'default', value: 'New course available', isRead: false },
        '2': { id: 2, type: 'urgent', value: 'New resume available', isRead: false },
        '3': { id: 3, type: 'urgent', value: 'New data available', isRead: true },
      },
    },
  });

  it('filterTypeSelected should return the correct filter', () => {
    const filter = filterTypeSelected(state);
    expect(filter).toBe('DEFAULT');
  });

  it('getNotifications should return the list of notifications', () => {
    const notifications = getNotifications(state);
    expect(notifications.toJS()).toEqual({
      '1': { id: 1, type: 'default', value: 'New course available', isRead: false },
      '2': { id: 2, type: 'urgent', value: 'New resume available', isRead: false },
      '3': { id: 3, type: 'urgent', value: 'New data available', isRead: true },
    });
  });

  it('getUnreadNotifications should return the list of unread notifications', () => {
    const unreadNotifications = getUnreadNotifications(state);
    expect(unreadNotifications.toJS()).toEqual({
      '1': { id: 1, type: 'default', value: 'New course available', isRead: false },
      '2': { id: 2, type: 'urgent', value: 'New resume available', isRead: false },
    });
  });
});
