import transitions from '../styles/transitions';
import { Component } from 'react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';
import propTypes from '../utils/propTypes';
import Paper from '../Paper';

function getStyles(props, state) {
  const {targetOrigin} = props;
  const {open} = state;
  const {muiTheme} = props;
  const horizontal = targetOrigin.horizontal.replace('middle', 'vertical');

  return {
    root: {
      position: 'fixed',
      zIndex: muiTheme.zIndex.popover,
      opacity: open ? 1 : 0,
      transform: open ? 'scale(1, 1)' : 'scale(0, 0)',
      transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
      transition: transitions.easeOut('250ms', ['transform', 'opacity']),
      maxHeight: '100%',
    },
    horizontal: {
      maxHeight: '100%',
      overflowY: 'auto',
      transform: open ? 'scaleX(1)' : 'scaleX(0)',
      opacity: open ? 1 : 0,
      transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
      transition: transitions.easeOut('250ms', ['transform', 'opacity']),
    },
    vertical: {
      opacity: open ? 1 : 0,
      transform: open ? 'scaleY(1)' : 'scaleY(0)',
      transformOrigin: `${horizontal} ${targetOrigin.vertical}`,
      transition: transitions.easeOut('500ms', ['transform', 'opacity']),
    },
  };
}

class PopoverAnimationDefault extends Component {
  static propTypes = {
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    open: PropTypes.bool.isRequired,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    targetOrigin: propTypes.origin.isRequired,
    zDepth: propTypes.zDepth,
  };

  static defaultProps = {
    style: {},
    zDepth: 1,
  };

  state = {
    open: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.open !== prevState.open) return {open: nextProps.open};
    return null;
  }

  componentDidMount() {
    this.setState({open: true}); // eslint-disable-line react/no-did-mount-set-state
  }

  render() {
    const {
      className,
      style,
      zDepth,
    } = this.props;

    const {prepareStyles} = this.props.muiTheme;
    const styles = getStyles(this.props, this.state);

    return (
      <Paper
        style={Object.assign(styles.root, style)}
        zDepth={zDepth}
        className={className}
      >
        <div css={prepareStyles(styles.horizontal)}>
          <div css={prepareStyles(styles.vertical)}>
            {this.props.children}
          </div>
        </div>
      </Paper>
    );
  }
}

export default withTheme(PopoverAnimationDefault);
