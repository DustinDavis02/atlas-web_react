import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { selectCourse, unSelectCourse, setCourses, fetchCourses } from './courseActionCreators';
import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from './courseActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('courseActionCreators', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('selectCourse should create an action to select a course', () => {
    const expectedAction = {
      type: SELECT_COURSE,
      index: 1,
    };
    expect(selectCourse(1)).toEqual(expectedAction);
  });

  it('unSelectCourse should create an action to unselect a course', () => {
    const expectedAction = {
      type: UNSELECT_COURSE,
      index: 1,
    };
    expect(unSelectCourse(1)).toEqual(expectedAction);
  });

  it('fetchCourses should fetch courses and dispatch setCourses', () => {
    const courses = [
      { id: '1', name: 'ES6', credit: 60 },
      { id: '2', name: 'Webpack', credit: 20 },
      { id: '3', name: 'React', credit: 40 },
    ];

    fetchMock.getOnce('/courses.json', {
      body: courses,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: FETCH_COURSE_SUCCESS, data: courses },
    ];

    const store = mockStore({ courses: [] });

    return store.dispatch(fetchCourses()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});