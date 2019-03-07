import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';
import transitions from '../styles/transitions';

function getStyles(props) {
  const {inkBar, isRtl} = props.muiTheme;

  return {
    root: {
      left: props.left,
      width: props.width,
      bottom: 0,
      display: 'block',
      backgroundColor: props.color || inkBar.backgroundColor,
      height: 2,
      marginTop: -2,
      position: 'relative',
      transition: transitions.easeOut('1s', isRtl ? 'right' : 'left'),
    },
  };
}

class InkBar extends Component {
  static propTypes = {
    color: PropTypes.string,
    left: PropTypes.string.isRequired,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    width: PropTypes.string.isRequired,
  };

  render() {
    const {style} = this.props;
    const {prepareStyles} = this.props.muiTheme;
    const styles = getStyles(this.props);

    return (
      <div style={prepareStyles(Object.assign(styles.root, style))} />
    );
  }
}

export default InkBar;
