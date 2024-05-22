import React from 'react';
import PropTypes from 'prop-types';

const headerStyle = {
  backgroundColor: '#deb5b545',
};

const rowStyle = {
  backgroundColor: '#f5f5f5ab',
};

const cellStyle = {
  border: '1px solid #ddd',
  textAlign: 'left',
  padding: '8px',
};

function CourseListRow({ isHeader = false, textFirstCell, textSecondCell = null }) {
  if (isHeader) {
    if (textSecondCell === null) {
      return (
        <tr style={headerStyle}>
          <th colSpan="2" style={cellStyle}>{textFirstCell}</th>
        </tr>
      );
    } else {
      return (
        <tr style={headerStyle}>
          <th style={cellStyle}>{textFirstCell}</th>
          <th style={cellStyle}>{textSecondCell}</th>
        </tr>
      );
    }
  } else {
    return (
      <tr style={rowStyle}>
        <td style={cellStyle}>{textFirstCell}</td>
        <td style={cellStyle}>{textSecondCell}</td>
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
