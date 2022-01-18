import { Children, Component } from 'react';
import PropTypes from 'prop-types';
import ReactTransitionGroup from 'react-transition-group/TransitionGroup';
import ExpandTransitionChild from './ExpandTransitionChild';
import withTheme from '../styles/withTheme';

class ExpandTransition extends Component {
  static propTypes = {
    children: PropTypes.node,
    enterDelay: PropTypes.number,
    expandTransitionChildStyle: PropTypes.object,
    loading: PropTypes.bool,
    open: PropTypes.bool,
    style: PropTypes.object,
    transitionDelay: PropTypes.number,
    transitionDuration: PropTypes.number,
  };

  static defaultProps = {
    enterDelay: 0,
    transitionDelay: 0,
    transitionDuration: 450,
    loading: false,
    open: false,
  };

  renderChildren(children) {
    const {enterDelay, transitionDelay, transitionDuration, expandTransitionChildStyle} = this.props;
    return Children.map(children, (child) => {
      return (
        <ExpandTransitionChild
          enterDelay={enterDelay}
          transitionDelay={transitionDelay}
          transitionDuration={transitionDuration}
          key={child.key}
          style={expandTransitionChildStyle}
        >
          {child}
        </ExpandTransitionChild>
      );
    }, this);
  }

  render() {
    const {
      children,
      enterDelay, // eslint-disable-line no-unused-vars
      loading,
      open,
      style,
      transitionDelay, // eslint-disable-line no-unused-vars
      transitionDuration, // eslint-disable-line no-unused-vars
      expandTransitionChildStyle, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const {prepareStyles} = this.props.muiTheme;

    const mergedRootStyles = Object.assign({}, {
      position: 'relative',
      overflow: 'hidden',
      height: 'auto',
    }, style);

    const newChildren = loading ? [] : this.renderChildren(children);

    return (
      <ReactTransitionGroup
        style={prepareStyles(mergedRootStyles)}
        component="div"
        {...other}
      >
        {open && newChildren}
      </ReactTransitionGroup>
    );
  }
}

export default withTheme(ExpandTransition);
