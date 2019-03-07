import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactTransitionGroup from 'react-transition-group/TransitionGroup';
import ScaleInChild from './ScaleInChild';
import withTheme from '../styles/withTheme';

class ScaleIn extends Component {
  static propTypes = {
    childStyle: PropTypes.object,
    children: PropTypes.node,
    enterDelay: PropTypes.number,
    maxScale: PropTypes.number,
    minScale: PropTypes.number,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static defaultProps = {
    enterDelay: 0,
  };

  render() {
    const {
      children,
      childStyle,
      enterDelay,
      maxScale,
      minScale,
      style,
      muiTheme,
      ...other
    } = this.props;

    const {prepareStyles} = muiTheme;

    const mergedRootStyles = Object.assign({}, {
      position: 'relative',
      height: '100%',
    }, style);

    const newChildren = React.Children.map(children, (child) => {
      return (
        <ScaleInChild
          key={child.key}
          enterDelay={enterDelay}
          maxScale={maxScale}
          minScale={minScale}
          style={childStyle}
        >
          {child}
        </ScaleInChild>
      );
    });

    return (
      <ReactTransitionGroup
        {...other}
        style={prepareStyles(mergedRootStyles)}
        component="div"
      >
        {newChildren}
      </ReactTransitionGroup>
    );
  }
}

export default withTheme(ScaleIn);
