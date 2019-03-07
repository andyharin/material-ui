import React from 'react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';

const Subheader = (props) => {
  const {
    children,
    inset,
    style,
    muiTheme,
    ...other
  } = props;

  const {
    prepareStyles,
    subheader,
  } = props.muiTheme;

  const styles = {
    root: {
      boxSizing: 'border-box',
      color: subheader.color,
      fontSize: 14,
      fontWeight: subheader.fontWeight,
      lineHeight: '48px',
      paddingLeft: inset ? 72 : 16,
      width: '100%',
    },
  };

  return (
    <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
      {children}
    </div>
  );
};

Subheader.muiName = 'Subheader';

Subheader.propTypes = {
  /**
   * Node that will be placed inside the `Subheader`.
   */
  children: PropTypes.node,
  /**
   * If true, the `Subheader` will be indented.
   */
  inset: PropTypes.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
};

Subheader.defaultProps = {
  inset: false,
};

export default withTheme(Subheader);
