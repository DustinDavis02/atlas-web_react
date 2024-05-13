import React from 'react';
import PropTypes from 'prop-types';
import BodySection from './BodySection';


function BodySectionWithMarginBottom({ title, children }) {
  return (
    <div className="bodySectionWithMargin">
      <BodySection title={title} children={children} />
    </div>
  );
}

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default BodySectionWithMarginBottom;
