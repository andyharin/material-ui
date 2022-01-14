import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';
import transitions from '../styles/transitions';
import withWidth, {SMALL} from '../utils/withWidth';
import FlatButton from '../FlatButton';

function getStyles(props) {
  const {
    open,
    width,
  } = props;

  const {
    muiTheme: {
      baseTheme: {
        spacing: {
          desktopGutter,
          desktopSubheaderHeight,
        },
        fontFamily,
      },
      snackbar: {
        backgroundColor,
        textColor,
        actionColor,
      },
      borderRadius,
    },
  } = props;

  const isSmall = width === SMALL;

  const styles = {
    root: {
      fontFamily: fontFamily,
      backgroundColor: backgroundColor,
      padding: `0 ${desktopGutter}px`,
      height: desktopSubheaderHeight,
      lineHeight: `${desktopSubheaderHeight}px`,
      borderRadius: isSmall ? 0 : borderRadius,
      maxWidth: isSmall ? 'inherit' : 568,
      minWidth: isSmall ? 'inherit' : 288,
      width: isSmall ? `calc(100vw - ${desktopGutter * 2}px)` : 'auto',
      flexGrow: isSmall ? 1 : 0,
    },
    content: {
      fontSize: 14,
      color: textColor,
      opacity: open ? 1 : 0,
      transition: open ?
        transitions.easeOut('500ms', 'opacity', '100ms') :
        transitions.easeOut('400ms', 'opacity'),
    },
    action: {
      color: actionColor,
      float: 'right',
      marginTop: 6,
      marginRight: -16,
      marginLeft: desktopGutter,
      backgroundColor: 'transparent',
    },
  };

  return styles;
}

export const SnackbarBody = (props) => {
  const {
    action,
    contentStyle,
    message,
    open, // eslint-disable-line no-unused-vars
    onActionClick,
    style,
    muiTheme,
    ...other
  } = props;

  const {prepareStyles} = muiTheme;
  const styles = getStyles(props);

  const actionButton = action && (
    <FlatButton
      style={styles.action}
      label={action}
      onClick={onActionClick}
    />
  );

  return (
    <div {...other} css={prepareStyles(Object.assign(styles.root, style))}>
      <div css={prepareStyles(Object.assign(styles.content, contentStyle))}>
        <span>{message}</span>
        {actionButton}
      </div>
    </div>
  );
};

SnackbarBody.propTypes = {
  /**
   * The label for the action on the snackbar.
   */
  action: PropTypes.node,
  /**
   * Override the inline-styles of the content element.
   */
  contentStyle: PropTypes.object,
  /**
   * The message to be displayed.
   *
   * (Note: If the message is an element or array, and the `Snackbar` may re-render while it is still open,
   * ensure that the same object remains as the `message` property if you want to avoid the `Snackbar` hiding and
   * showing again)
   */
  message: PropTypes.node.isRequired,
  /**
   * Fired when the action button is clicked.
   *
   * @param {object} event Action button event.
   */
  onActionClick: PropTypes.func,
  /**
   * @ignore
   * Controls whether the `Snackbar` is opened or not.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
  /**
   * @ignore
   * Width of the screen.
   */
  width: PropTypes.number.isRequired,
};

export default withWidth()(withTheme(SnackbarBody));
