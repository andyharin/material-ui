import React, {Children, cloneElement} from 'react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';

function getStyles(props) {
  const {
    bottomNavigation,
  } = props.muiTheme;

  const styles = {
    root: {
      position: 'relative',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: bottomNavigation.backgroundColor,
      height: bottomNavigation.height,
    },
    item: {
      flex: '1',
    },
  };

  return styles;
}

const BottomNavigation = (props) => {
  const {
    children,
    style,
    selectedIndex,
    ...other
  } = props;

  const {prepareStyles} = props.muiTheme;
  const styles = getStyles(props);

  const preparedChildren = Children.map(children, (child, index) => {
    if (!child) {
      return null;
    }

    return cloneElement(child, {
      style: Object.assign({}, styles.item, child.props.style),
      selected: index === selectedIndex,
    });
  });

  return (
    <div {...other} style={prepareStyles(Object.assign({}, styles.root, style))}>
      {preparedChildren}
    </div>
  );
};

BottomNavigation.propTypes = {
  /**
   * The `BottomNavigationItem`s to populate the element with.
   */
  children: PropTypes.node,
  /**
   * The index of the currently selected navigation item.
   */
  selectedIndex: PropTypes.number,
  /**
   * @ignore
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
};

export default withTheme(BottomNavigation);
