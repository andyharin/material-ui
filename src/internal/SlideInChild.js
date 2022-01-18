import { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import withTheme from '../styles/withTheme';
import autoPrefix from '../utils/autoPrefix';
import transitions from '../styles/transitions';

class SlideInChild extends Component {
  static propTypes = {
    children: PropTypes.node,
    direction: PropTypes.string,
    enterDelay: PropTypes.number,
    // This callback is needed bacause the direction could change when leaving the DOM
    getLeaveDirection: PropTypes.func.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    enterDelay: 0,
  };

  componentWillUnmount() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
  }

  componentWillEnter(callback) {
    const style = ReactDOM.findDOMNode(this).style;
    const x = this.props.direction === 'left' ? '100%' :
      this.props.direction === 'right' ? '-100%' : '0';
    const y = this.props.direction === 'up' ? '100%' :
      this.props.direction === 'down' ? '-100%' : '0';

    style.opacity = '0';
    autoPrefix.set(style, 'transform', `translate(${x}, ${y})`);

    this.enterTimer = setTimeout(callback, this.props.enterDelay);
  }

  componentDidEnter() {
    const style = ReactDOM.findDOMNode(this).style;
    style.opacity = '1';
    autoPrefix.set(style, 'transform', 'translate(0,0)');
  }

  componentWillLeave(callback) {
    const style = ReactDOM.findDOMNode(this).style;
    const direction = this.props.getLeaveDirection();
    const x = direction === 'left' ? '-100%' :
      direction === 'right' ? '100%' : '0';
    const y = direction === 'up' ? '-100%' :
      direction === 'down' ? '100%' : '0';

    style.opacity = '0';
    autoPrefix.set(style, 'transform', `translate(${x}, ${y})`);

    this.leaveTimer = setTimeout(callback, 450);
  }

  render() {
    const {
      children,
      enterDelay, // eslint-disable-line no-unused-vars
      getLeaveDirection, // eslint-disable-line no-unused-vars
      style,
      muiTheme,
      ...other
    } = this.props;

    const {prepareStyles} = this.props.muiTheme;

    const mergedRootStyles = Object.assign({}, {
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      transition: transitions.easeOut(null, ['transform', 'opacity']),
    }, style);

    return (
      <div {...other} css={prepareStyles(mergedRootStyles)}>
        {children}
      </div>
    );
  }
}

export default withTheme(SlideInChild);
