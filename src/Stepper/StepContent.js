import { Component } from 'react';
import {jsx} from '@emotion/react';
import PropTypes from 'prop-types';
import TransitionComponent from '../internal/ExpandTransition';
import { withContext } from './Context';
import warning from 'warning';
import withTheme from '../styles/withTheme';

function ExpandTransition(props) {
  return <TransitionComponent {...props} />;
}

const getStyles = (props) => {
  const styles = {
    root: {
      marginTop: -14,
      marginLeft: 14 + 11, // padding + 1/2 icon
      paddingLeft: 24 - 11 + 8,
      paddingRight: 16,
      overflow: 'hidden',
    },
  };

  if (!props.last) {
    styles.root.borderLeft = `1px solid ${props.muiTheme.stepper.connectorLineColor}`;
  }

  return styles;
};

class StepContent extends Component {
  static propTypes = {
    /**
     * Expands the content
     */
    active: PropTypes.bool,
    /**
     * Step content
     */
    children: PropTypes.node,
    /**
     * @ignore
     */
    completed: PropTypes.bool,
    /**
     * @ignore
     */
    last: PropTypes.bool,
    /**
     * Override the inline-style of the root element.
     */
    style: PropTypes.object,
    /**
     * ReactTransitionGroup component.
     */
    transition: PropTypes.func,
    /**
     * Adjust the duration of the content expand transition. Passed as a prop to the transition component.
     */
    transitionDuration: PropTypes.number,
  };

  static defaultProps = {
    transition: ExpandTransition,
    transitionDuration: 450,
  };

  render() {
    const {
      active,
      children,
      completed, // eslint-disable-line no-unused-vars
      last, // eslint-disable-line no-unused-vars
      style,
      transition,
      transitionDuration,
      muiTheme: { prepareStyles },
      stepper,
      ...other
    } = this.props;

    if (stepper.orientation !== 'vertical') {
      warning(false, 'Material-UI: <StepContent /> is only designed for use with the vertical stepper.');
      return null;
    }

    const styles = getStyles(this.props);
    const transitionProps = {
      enterDelay: transitionDuration,
      transitionDuration: transitionDuration,
      open: active,
    };

    return (
      <div css={prepareStyles(Object.assign(styles.root, style))} {...other}>
        {jsx(transition, transitionProps, <div css={{overflow: 'hidden'}}>{children}</div>)}
      </div>
    );
  }
}

export default withTheme(withContext(StepContent));
