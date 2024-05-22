import React from 'react';
import PropTypes from 'prop-types';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  headerRow: {
    backgroundColor: '#deb5b545',
  },
  row: {
    backgroundColor: '#f5f5f5ab',
  },
  cell: {
    border: '1px solid #ddd',
    textAlign: 'left',
    padding: '8px',
  },
});

function CourseListRow({ isHeader = false, textFirstCell, textSecondCell = null }) {
  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr className={css(styles.headerRow)}>
          <th colSpan="2" className={css(styles.cell)}>{textFirstCell}</th>
        </tr>
      );
    } else {
      return (
        <tr className={css(styles.headerRow)}>
          <th className={css(styles.cell)}>{textFirstCell}</th>
          <th className={css(styles.cell)}>{textSecondCell}</th>
        </tr>
      );
    }
  } else {
    return (
      <tr className={css(styles.row)}>
        <td className={css(styles.cell)}>{textFirstCell}</td>
        <td className={css(styles.cell)}>{textSecondCell}</td>
      </tr>
    );
  }
}

CourseListRow.propTypes = {
  isHeader: PropTypes.bool,
  textFirstCell: PropTypes.string.isRequired,
  textSecondCell: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
};

export default CourseListRow;
