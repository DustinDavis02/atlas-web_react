import { fromJS, Map } from 'immutable';
import { getAllCourses } from './courseSelector';

describe('courseSelector', () => {
  it('should return an empty list when there are no courses', () => {
    const state = fromJS({
      courses: Map(),
    });

    const result = getAllCourses(state);
    expect(result).toEqual(fromJS([]));
  });

  it('should return a list of courses when there are courses', () => {
    const state = fromJS({
      courses: {
        1: { id: 1, name: 'ES6', credit: 60, isSelected: false },
        2: { id: 2, name: 'Webpack', credit: 20, isSelected: false },
        3: { id: 3, name: 'React', credit: 40, isSelected: false },
      },
    });

    const result = getAllCourses(state);
    const expected = fromJS([
      { id: 1, name: 'ES6', credit: 60, isSelected: false },
      { id: 2, name: 'Webpack', credit: 20, isSelected: false },
      { id: 3, name: 'React', credit: 40, isSelected: false },
    ]);

    expect(result).toEqual(expected);
  });
});
