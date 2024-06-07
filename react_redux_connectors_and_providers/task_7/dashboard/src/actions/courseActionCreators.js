import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from './courseActionTypes';

export const selectCourse = (index) => ({
  type: SELECT_COURSE,
  index,
});

export const unSelectCourse = (index) => ({
  type: UNSELECT_COURSE,
  index,
});

export const setCourses = (data) => ({
  type: FETCH_COURSE_SUCCESS,
  data,
});

export const fetchCourses = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('/courses.json');
      if (response.ok) {
        const data = await response.json();
        dispatch(setCourses(data));
      } else {
        console.error('Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
};

export const bindCourseActionCreators = (dispatch) => ({
  boundSelectCourse: (index) => dispatch(selectCourse(index)),
  boundUnSelectCourse: (index) => dispatch(unSelectCourse(index)),
  boundFetchCourses: () => dispatch(fetchCourses()),
});
