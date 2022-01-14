import {Component} from 'react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';
import propTypes from '../utils/propTypes';
import transitions from '../styles/transitions';

function getStyles(props) {
  const {
    rounded,
    circle,
    transitionEnabled,
    zDepth,
  } = props;

  const {
    baseTheme,
    paper,
    borderRadius,
  } = props.muiTheme;

  return {
    root: {
      color: paper.color,
      backgroundColor: paper.backgroundColor,
      transition: transitionEnabled && transitions.easeOut(),
      boxSizing: 'border-box',
      fontFamily: baseTheme.fontFamily,
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      boxShadow: paper.zDepthShadows[zDepth - 1], // No shadow for 0 depth papers
      borderRadius: circle ? '50%' : rounded ? borderRadius : '0px',
    },
  };
}

class Paper extends Component {
  static propTypes = {
    /**
     * Children passed into the paper element.
     */
    children: PropTypes.node,
    /**
     * Set to true to generate a circular paper container.
     */
    circle: PropTypes.bool,
    /**
     * By default, the paper container will have a border radius.
     * Set this to false to generate a container with sharp corners.
     */
    rounded: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * Set to false to disable CSS transitions for the paper element.
     */
    transitionEnabled: PropTypes.bool,
    /**
     * This number represents the zDepth of the paper shadow.
     */
    zDepth: propTypes.zDepth,
  };

  static defaultProps = {
    circle: false,
    rounded: true,
    transitionEnabled: true,
    zDepth: 1,
  };


  render() {
    const {
      children,
      circle, // eslint-disable-line no-unused-vars
      rounded, // eslint-disable-line no-unused-vars
      style,
      transitionEnabled, // eslint-disable-line no-unused-vars
      zDepth, // eslint-disable-line no-unused-vars
      muiTheme,
      ...other
    } = this.props;

    const {prepareStyles} = muiTheme;
    const styles = getStyles(this.props);

    return (
      <div {...other} css={prepareStyles(Object.assign(styles.root, style))}>
        {children}
      </div>
    );
  }
}

export default withTheme(Paper);
