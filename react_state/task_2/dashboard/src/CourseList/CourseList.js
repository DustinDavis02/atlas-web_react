import React from 'react';
import PropTypes from 'prop-types';
import CourseListRow from './CourseListRow';
import CourseShape from './CourseShape';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  courseList: {
    width: '80%',
    margin: '20px auto',
    borderCollapse: 'collapse',
    backgroundColor: '#fff',
  },
  th: {
    border: '1px solid #ddd',
    textAlign: 'left',
    padding: '8px',
  },
  td: {
    border: '1px solid #ddd',
    textAlign: 'left',
    padding: '8px',
  },
  theadTh: {
    textAlign: 'center',
  },
  tbodyTrEven: {
    backgroundColor: '#f9f9f9',
  }
});

function CourseList({ listCourses = [] }) {
  return (
    <table className={css(styles.courseList)}>
      <thead>
        <CourseListRow isHeader textFirstCell="Available courses" />
        <CourseListRow isHeader textFirstCell="Course name" textSecondCell="Credit" />
      </thead>
      <tbody>
        {listCourses.length === 0 ? (
          <CourseListRow textFirstCell="No course available yet" colSpan="2" />
        ) : (
          listCourses.map(course => (
            <CourseListRow key={course.id} textFirstCell={course.name} textSecondCell={course.credit.toString()} />
          ))
        )}
      </tbody>
    </table>
  );
}

CourseList.propTypes = {
  listCourses: PropTypes.arrayOf(CourseShape)
};

export default CourseList;
