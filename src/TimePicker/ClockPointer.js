import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';
import {isInner} from './timeUtils';

function calcAngle(value, base) {
  value %= base;
  const angle = 360 / base * value;
  return angle;
}

function getStyles(props, state) {
  const {hasSelected, type, value} = props;
  const {inner} = state;
  const {timePicker} = props.muiTheme;
  const angle = type === 'hour' ? calcAngle(value, 12) : calcAngle(value, 60);

  const styles = {
    root: {
      height: inner ? '30%' : '40%',
      background: timePicker.accentColor,
      width: 2,
      left: 'calc(50% - 1px)',
      position: 'absolute',
      bottom: '50%',
      transformOrigin: 'bottom',
      pointerEvents: 'none',
      transform: `rotateZ(${angle}deg)`,
    },
    mark: {
      boxSizing: 'content-box',
      background: timePicker.selectTextColor,
      border: `4px solid ${timePicker.accentColor}`,
      display: hasSelected && 'none',
      width: 7,
      height: 7,
      position: 'absolute',
      top: -5,
      left: -6,
      borderRadius: '100%',
    },
  };

  return styles;
}

class ClockPointer extends Component {
  static propTypes = {
    hasSelected: PropTypes.bool,
    type: PropTypes.oneOf(['hour', 'minute']),
    value: PropTypes.number,
  };

  static defaultProps = {
    hasSelected: false,
    value: null,
    type: 'minute',
  };

  state = {
    inner: false,
  };

  componentWillMount() {
    this.setState({
      inner: isInner(this.props),
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      inner: isInner(nextProps),
    });
  }

  render() {
    if (this.props.value === null) {
      return <span />;
    }

    const styles = getStyles(this.props, this.state);
    const {prepareStyles} = this.props.muiTheme;

    return (
      <div style={prepareStyles(styles.root)} >
        <div style={prepareStyles(styles.mark)} />
      </div>
    );
  }
}

export default withTheme(ClockPointer);
