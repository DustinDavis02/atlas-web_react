import { getFullYear, getFooterCopy, getLatestNotification } from './utils';

describe('utility functions', () => {
  // Test for getFullYear
  test('getFullYear returns the current year', () => {
    const year = new Date().getFullYear();
    expect(getFullYear()).toBe(year);
  });

  // Tests for getFooterCopy
  describe('getFooterCopy', () => {
    test('returns "Holberton School" when the argument is true', () => {
      expect(getFooterCopy(true)).toBe('Holberton School');
    });

    test('returns "Holberton School main dashboard" when the argument is false', () => {
      expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
    });
  });

  // Test for getLatestNotification
  test('getLatestNotification returns the correct string', () => {
    const expectedString = '<strong>Urgent requirement</strong> - complete by EOD';
    expect(getLatestNotification()).toBe(expectedString);
  });
});