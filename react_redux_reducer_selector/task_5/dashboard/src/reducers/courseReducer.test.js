import { Map } from 'immutable';
import courseReducer from './courseReducer';
import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from '../actions/courseActionTypes';

describe('courseReducer', () => {
  it('should return the initial state when no action is passed', () => {
    expect(courseReducer(undefined, {}).toJS()).toEqual({});
  });

  it('should handle FETCH_COURSE_SUCCESS and return the data with isSelected set to false', () => {
    const action = {
      type: FETCH_COURSE_SUCCESS,
      data: [
        { id: 1, name: "ES6", credit: 60 },
        { id: 2, name: "Webpack", credit: 20 },
        { id: 3, name: "React", credit: 40 }
      ]
    };
    const expectedState = {
      '1': { id: 1, name: "ES6", credit: 60, isSelected: false },
      '2': { id: 2, name: "Webpack", credit: 20, isSelected: false },
      '3': { id: 3, name: "React", credit: 40, isSelected: false }
    };
    expect(courseReducer(undefined, action).toJS()).toEqual(expectedState);
  });

  it('should handle SELECT_COURSE and update the correct course', () => {
    const initialState = Map({
      '1': Map({ id: 1, name: "ES6", credit: 60, isSelected: false }),
      '2': Map({ id: 2, name: "Webpack", credit: 20, isSelected: false }),
      '3': Map({ id: 3, name: "React", credit: 40, isSelected: false })
    });
    const action = {
      type: SELECT_COURSE,
      index: '2'
    };
    const expectedState = {
      '1': { id: 1, name: "ES6", credit: 60, isSelected: false },
      '2': { id: 2, name: "Webpack", credit: 20, isSelected: true },
      '3': { id: 3, name: "React", credit: 40, isSelected: false }
    };
    expect(courseReducer(initialState, action).toJS()).toEqual(expectedState);
  });

  it('should handle UNSELECT_COURSE and update the correct course', () => {
    const initialState = Map({
      '1': Map({ id: 1, name: "ES6", credit: 60, isSelected: false }),
      '2': Map({ id: 2, name: "Webpack", credit: 20, isSelected: true }),
      '3': Map({ id: 3, name: "React", credit: 40, isSelected: false })
    });
    const action = {
      type: UNSELECT_COURSE,
      index: '2'
    };
    const expectedState = {
      '1': { id: 1, name: "ES6", credit: 60, isSelected: false },
      '2': { id: 2, name: "Webpack", credit: 20, isSelected: false },
      '3': { id: 3, name: "React", credit: 40, isSelected: false }
    };
    expect(courseReducer(initialState, action).toJS()).toEqual(expectedState);
  });
});
