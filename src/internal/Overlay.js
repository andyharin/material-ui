import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';
import transitions from '../styles/transitions';
import AutoLockScrolling from './AutoLockScrolling';

function getStyles(props) {
  const {overlay} = props.muiTheme;

  const style = {
    root: {
      position: 'fixed',
      height: '100%',
      width: '100%',
      top: 0,
      left: '-100%',
      opacity: 0,
      backgroundColor: overlay.backgroundColor,
      WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', // Remove mobile color flashing (deprecated)

      // Two ways to promote overlay to its own render layer
      willChange: 'opacity',
      transform: 'translateZ(0)',

      transition:
        props.transitionEnabled && `${transitions.easeOut('0ms', 'left', '400ms')}, ${
          transitions.easeOut('400ms', 'opacity')}`,
    },
  };

  if (props.show) {
    Object.assign(style.root, {
      left: 0,
      opacity: 1,
      transition: `${transitions.easeOut('0ms', 'left')}, ${
        transitions.easeOut('400ms', 'opacity')}`,
    });
  }

  return style;
}

class Overlay extends Component {
  static propTypes = {
    autoLockScrolling: PropTypes.bool,
    show: PropTypes.bool.isRequired,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    transitionEnabled: PropTypes.bool,
  };

  static defaultProps = {
    autoLockScrolling: true,
    style: {},
    transitionEnabled: true,
  };

  setOpacity(opacity) {
    this.refs.overlay.style.opacity = opacity;
  }

  render() {
    const {
      autoLockScrolling,
      show,
      style,
      transitionEnabled, // eslint-disable-line no-unused-vars
      muiTheme,
      ...other
    } = this.props;
    const {prepareStyles} = muiTheme || {};
    const styles = getStyles(this.props);

    return (
      <div {...other} ref="overlay" style={prepareStyles(Object.assign(styles.root, style))}>
        {autoLockScrolling && <AutoLockScrolling lock={show} />}
      </div>
    );
  }
}

export default withTheme(Overlay);
