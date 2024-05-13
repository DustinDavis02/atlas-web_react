import React from 'react';
import { mount } from 'enzyme';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';

describe('CourseList', () => {
  it('renders without crashing', () => {
    mount(<CourseList />);
  });

  it('renders no courses available message when listCourses is empty', () => {
    const wrapper = mount(<CourseList listCourses={[]} />);
    expect(wrapper.find(CourseListRow).length).toBe(3);  
    expect(wrapper.text()).toContain("No course available yet");
  });
  
  it('renders correctly if listCourses property is not passed', () => {
    const wrapper = mount(<CourseList />);
    expect(wrapper.find(CourseListRow).length).toBe(3);  
    expect(wrapper.text()).toContain("No course available yet");
  });

  it('renders course rows correctly with listCourses data', () => {
    const courses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ];
    const wrapper = mount(<CourseList listCourses={courses} />);
    expect(wrapper.find(CourseListRow).length).toEqual(5);
    expect(wrapper.text()).not.toContain("No course available yet");
  });
});