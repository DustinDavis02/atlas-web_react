import React from 'react';
import PropTypes from 'prop-types';
import BodySection from './BodySection';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  margin: {
    marginBottom: '40px',
  },
});

function BodySectionWithMarginBottom({ title, children }) {
  return (
    <div className={css(styles.margin)}>
      <BodySection title={title} children={children} />
    </div>
  );
}

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default BodySectionWithMarginBottom;
