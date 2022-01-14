import {Component} from 'react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';
import transitions from '../styles/transitions';

function getRelativeValue(value, min, max) {
  const clampedValue = Math.min(Math.max(min, value), max);
  const rangeValue = max - min;
  const relValue = Math.round((clampedValue - min) / rangeValue * 10000) / 10000;
  return relValue * 100;
}

function getStyles(props) {
  const {
    max,
    min,
    value,
  } = props;

  const {baseTheme: {palette}, borderRadius} = props.muiTheme;

  const styles = {
    root: {
      position: 'relative',
      height: 4,
      display: 'block',
      width: '100%',
      backgroundColor: palette.primary3Color,
      borderRadius,
      margin: 0,
      overflow: 'hidden',
    },
    bar: {
      height: '100%',
    },
    barFragment1: {},
    barFragment2: {},
  };

  if (props.mode === 'indeterminate') {
    styles.barFragment1 = {
      position: 'absolute',
      backgroundColor: props.color || palette.primary1Color,
      top: 0,
      left: 0,
      bottom: 0,
      transition: transitions.create('all', '840ms', null, 'cubic-bezier(0.650, 0.815, 0.735, 0.395)'),
    };

    styles.barFragment2 = {
      position: 'absolute',
      backgroundColor: props.color || palette.primary1Color,
      top: 0,
      left: 0,
      bottom: 0,
      transition: transitions.create('all', '840ms', null, 'cubic-bezier(0.165, 0.840, 0.440, 1.000)'),
    };
  } else {
    styles.bar.backgroundColor = props.color || palette.primary1Color;
    styles.bar.transition = transitions.create('width', '.3s', null, 'linear');
    styles.bar.width = `${getRelativeValue(value, min, max)}%`;
  }

  return styles;
}

class LinearProgress extends Component {
  static propTypes = {
    /**
     * The color of the progress bar, defaults to
     * primary color of theme.
     */
    color: PropTypes.string,
    /**
     * The max value of progress, only works in determinate mode.
     */
    max: PropTypes.number,
    /**
     * The min value of progress, only works in determinate mode.
     */
    min: PropTypes.number,
    /**
     * The mode of show your progress, indeterminate for when
     * there is no value for progress.
     */
    mode: PropTypes.oneOf(['determinate', 'indeterminate']),
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * The value of progress, only works in determinate mode.
     */
    value: PropTypes.number,
  };

  static defaultProps = {
    mode: 'indeterminate',
    value: 0,
    min: 0,
    max: 100,
  };

  componentDidMount() {
    this.timers = {};

    this.timers.bar1 = this.barUpdate('bar1', 0, this.refs.bar1, [
      [-35, 100],
      [100, -90],
    ], 0);

    this.timers.bar2 = setTimeout(() => {
      this.barUpdate('bar2', 0, this.refs.bar2, [
        [-200, 100],
        [107, -8],
      ], 0);
    }, 850);
  }

  componentWillUnmount() {
    clearTimeout(this.timers.bar1);
    clearTimeout(this.timers.bar2);
  }

  barUpdate(id, step, barElement, stepValues, timeToNextStep) {
    if (this.props.mode !== 'indeterminate') return;

    timeToNextStep = timeToNextStep || 420;
    step = step || 0;
    step %= 4;

    const right = this.props.muiTheme.isRtl ? 'left' : 'right';
    const left = this.props.muiTheme.isRtl ? 'right' : 'left';

    if (step === 0) {
      barElement.style[left] = `${stepValues[0][0]}%`;
      barElement.style[right] = `${stepValues[0][1]}%`;
    } else if (step === 1) {
      barElement.style.transitionDuration = '840ms';
    } else if (step === 2) {
      barElement.style[left] = `${stepValues[1][0]}%`;
      barElement.style[right] = `${stepValues[1][1]}%`;
    } else if (step === 3) {
      barElement.style.transitionDuration = '0ms';
    }
    this.timers[id] = setTimeout(() => this.barUpdate(id, step + 1, barElement, stepValues), timeToNextStep);
  }

  render() {
    const {
      style,
      muiTheme,
      ...other
    } = this.props;

    const {prepareStyles} = this.props.muiTheme;
    const styles = getStyles(this.props);

    return (
      <div {...other} css={prepareStyles(Object.assign(styles.root, style))}>
        <div css={prepareStyles(styles.bar)}>
          <div ref="bar1" css={prepareStyles(styles.barFragment1)} />
          <div ref="bar2" css={prepareStyles(styles.barFragment2)} />
        </div>
      </div>
    );
  }
}

export default withTheme(LinearProgress);
