import { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import withTheme from '../styles/withTheme';
import transitions from '../styles/transitions';

const reflow = (elem) => elem.offsetHeight;

class ExpandTransitionChild extends Component {
  static propTypes = {
    children: PropTypes.node,
    enterDelay: PropTypes.number,
    style: PropTypes.object,
    transitionDelay: PropTypes.number,
    transitionDuration: PropTypes.number,
  };

  static defaultProps = {
    enterDelay: 0,
    transitionDelay: 0,
    transitionDuration: 450,
  };

  componentWillUnmount() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.enteredTimer);
    clearTimeout(this.leaveTimer);
  }

  componentWillAppear(callback) {
    this.open();
    callback();
  }

  componentDidAppear() {
    this.setAutoHeight();
  }

  componentWillEnter(callback) {
    const {enterDelay, transitionDelay, transitionDuration} = this.props;
    const element = ReactDOM.findDOMNode(this);
    element.style.height = 0;
    this.enterTimer = setTimeout(() => this.open(), enterDelay);
    this.enteredTimer = setTimeout(
      () => callback(),
      enterDelay + transitionDelay + transitionDuration
    );
  }

  componentDidEnter() {
    this.setAutoHeight();
  }

  componentWillLeave(callback) {
    const {transitionDelay, transitionDuration} = this.props;
    const element = ReactDOM.findDOMNode(this);
    // Set fixed height first for animated property value
    element.style.height = `${this.refs.wrapper.clientHeight}px`;
    reflow(element);
    element.style.transitionDuration = `${transitionDuration}ms`;
    element.style.height = 0;
    this.leaveTimer = setTimeout(() => callback(), transitionDelay + transitionDuration);
  }

  setAutoHeight() {
    const {style} = ReactDOM.findDOMNode(this);
    style.transitionDuration = 0;
    style.height = 'auto';
  }

  open() {
    const element = ReactDOM.findDOMNode(this);
    element.style.height = `${this.refs.wrapper.clientHeight}px`;
  }

  render() {
    const {
      children,
      enterDelay,  // eslint-disable-line no-unused-vars
      style,
      transitionDelay, // eslint-disable-line no-unused-vars
      transitionDuration,
      muiTheme,
      ...other
    } = this.props;

    const {prepareStyles} = this.props.muiTheme;

    const mergedRootStyles = Object.assign({
      position: 'relative',
      height: 0,
      width: '100%',
      top: 0,
      left: 0,
      overflow: 'hidden',
      transition: transitions.easeOut(
        `${transitionDuration}ms`,
        ['height'],
        `${transitionDelay}ms`
      ),
    }, style);

    return (
      <div {...other} css={prepareStyles(mergedRootStyles)}>
        <div ref="wrapper">{children}</div>
      </div>
    );
  }
}

export default withTheme(ExpandTransitionChild);
