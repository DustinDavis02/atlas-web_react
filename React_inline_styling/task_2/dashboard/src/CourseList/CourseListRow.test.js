import React from 'react';
import { shallow } from 'enzyme';
import CourseListRow from './CourseListRow';

describe('CourseListRow', () => {
  describe('when isHeader is true', () => {
    it('renders one cell with colspan = 2 when textSecondCell does not exist', () => {
      const wrapper = shallow(<CourseListRow isHeader textFirstCell="Available courses" />);
      expect(wrapper.find('th').length).toEqual(1);
      expect(wrapper.find('th').prop('colSpan')).toEqual("2");
    });

    it('renders two cells when textSecondCell is present', () => {
      const wrapper = shallow(<CourseListRow isHeader textFirstCell="Course name" textSecondCell="Credit" />);
      expect(wrapper.find('th').length).toEqual(2);
    });
  });

  describe('when isHeader is false', () => {
    it('renders correctly two td elements within a tr element', () => {
      const wrapper = shallow(<CourseListRow textFirstCell="ES6" textSecondCell="60" />);
      expect(wrapper.find('td').length).toEqual(2);
      expect(wrapper.find('tr').length).toEqual(1);
    });
  });
});