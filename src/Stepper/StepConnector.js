import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import withTheme from '../styles/withTheme';
import { withContext } from './Context';

const propTypes = {
  /**
   * Override the inline-style of the root element.
   */
  style: PropTypes.object,
};

const StepConnector = (props) => {
  const {muiTheme, stepper } = props;

  const styles = {
    wrapper: {
      flex: '1 1 auto',
    },
    line: {
      display: 'block',
      borderColor: muiTheme.stepper.connectorLineColor,
    },
  };

  /**
   * Clean up once we can use CSS pseudo elements
   */
  if (stepper.orientation === 'horizontal') {
    styles.line.marginLeft = -6;
    styles.line.borderTopStyle = 'solid';
    styles.line.borderTopWidth = 1;
  } else if (stepper.orientation === 'vertical') {
    styles.wrapper.marginLeft = 14 + 11; // padding + 1/2 icon
    styles.line.borderLeftStyle = 'solid';
    styles.line.borderLeftWidth = 1;
    styles.line.minHeight = 28;
  }

  const {prepareStyles} = muiTheme;

  return (
    <div css={prepareStyles(styles.wrapper)}>
      <span css={prepareStyles(styles.line)} />
    </div>
  );
};

StepConnector.propTypes = propTypes;
const SC = withTheme(withContext(StepConnector))

export {SC as PlainStepConnector};
export default pure(SC);
