import {Component, cloneElement} from 'react';
import {jsx} from '@emotion/react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';
import IconButton from '../IconButton';
import NavigationMenu from '../svg-icons/navigation/menu';
import Paper from '../Paper';
import propTypes from '../utils/propTypes';
import warning from 'warning';

export function getStyles(props) {
  const {
    appBar,
    button: {
      iconButtonSize,
    },
    zIndex,
  } = props.muiTheme;

  const flatButtonSize = 36;

  const styles = {
    root: {
      position: 'relative',
      zIndex: zIndex.appBar,
      width: '100%',
      display: 'flex',
      backgroundColor: appBar.color,
      paddingLeft: appBar.padding,
      paddingRight: appBar.padding,
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      margin: 0,
      paddingTop: 0,
      letterSpacing: 0,
      fontSize: 24,
      fontWeight: appBar.titleFontWeight,
      color: appBar.textColor,
      height: appBar.height,
      lineHeight: `${appBar.height}px`,
    },
    mainElement: {
      boxFlex: 1,
      flex: '1',
    },
    iconButtonStyle: {
      marginTop: (appBar.height - iconButtonSize) / 2,
      marginRight: 8,
      marginLeft: -16,
    },
    iconButtonIconStyle: {
      fill: appBar.textColor,
      color: appBar.textColor,
    },
    flatButton: {
      color: appBar.textColor,
      marginTop: (iconButtonSize - flatButtonSize) / 2 + 1,
    },
  };

  return styles;
}

class AppBar extends Component {
  static muiName = 'AppBar';

  static propTypes = {
    /**
     * Can be used to render a tab inside an app bar for instance.
     */
    children: PropTypes.node,
    /**
     * Applied to the app bar's root element.
     */
    className: PropTypes.string,
    /**
     * The classname of the icon on the left of the app bar.
     * If you are using a stylesheet for your icons, enter the class name for the icon to be used here.
     */
    iconClassNameLeft: PropTypes.string,
    /**
     * Similiar to the iconClassNameLeft prop except that
     * it applies to the icon displayed on the right of the app bar.
     */
    iconClassNameRight: PropTypes.string,
    /**
     * The custom element to be displayed on the left side of the
     * app bar such as an SvgIcon.
     */
    iconElementLeft: PropTypes.element,
    /**
     * Similiar to the iconElementLeft prop except that this element is displayed on the right of the app bar.
     */
    iconElementRight: PropTypes.element,
    /**
     * Override the inline-styles of the element displayed on the left side of the app bar.
     */
    iconStyleLeft: PropTypes.object,
    /**
     * Override the inline-styles of the element displayed on the right side of the app bar.
     */
    iconStyleRight: PropTypes.object,
    /**
     * Callback function for when the left icon is selected via a click.
     *
     * @param {object} event Click event targeting the left `IconButton`.
     */
    onLeftIconButtonClick: PropTypes.func,
    /**
     * Callback function for when the right icon is selected via a click.
     *
     * @param {object} event Click event targeting the right `IconButton`.
     */
    onRightIconButtonClick: PropTypes.func,
    /**
     * Callback function for when the title text is selected via a click.
     *
     * @param {object} event Click event targeting the `title` node.
     */
    onTitleClick: PropTypes.func,
    /**
     * Determines whether or not to display the Menu icon next to the title.
     * Setting this prop to false will hide the icon.
     */
    showMenuIconButton: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * The title to display on the app bar.
     */
    title: PropTypes.node,
    /**
     * Override the inline-styles of the app bar's title element.
     */
    titleStyle: PropTypes.object,
    /**
     * The zDepth of the component.
     * The shadow of the app bar is also dependent on this property.
     */
    zDepth: propTypes.zDepth,
  };

  static defaultProps = {
    showMenuIconButton: true,
    title: '',
    zDepth: 1,
  };

  componentDidMount() {
    warning(!this.props.iconElementLeft || !this.props.iconClassNameLeft, `Material-UI: Properties iconElementLeft
      and iconClassNameLeft cannot be simultaneously defined. Please use one or the other.`);

    warning(!this.props.iconElementRight || !this.props.iconClassNameRight, `Material-UI: Properties iconElementRight
      and iconClassNameRight cannot be simultaneously defined. Please use one or the other.`);
  }

  handleClickLeftIconButton = (event) => {
    if (this.props.onLeftIconButtonClick) {
      this.props.onLeftIconButtonClick(event);
    }
  };

  handleClickRightIconButton = (event) => {
    if (this.props.onRightIconButtonClick) {
      this.props.onRightIconButtonClick(event);
    }
  };

  handleTitleClick = (event) => {
    if (this.props.onTitleClick) {
      this.props.onTitleClick(event);
    }
  };

  render() {
    const {
      title,
      titleStyle,
      iconStyleLeft,
      iconStyleRight,
      onTitleClick, // eslint-disable-line no-unused-vars
      showMenuIconButton,
      iconElementLeft,
      iconElementRight,
      iconClassNameLeft,
      iconClassNameRight,
      onLeftIconButtonClick, // eslint-disable-line no-unused-vars
      onRightIconButtonClick, // eslint-disable-line no-unused-vars
      className,
      style,
      zDepth,
      children,
      muiTheme,
      ...other
    } = this.props;

    const {prepareStyles} = muiTheme;
    const styles = getStyles(this.props);

    let menuElementLeft;
    let menuElementRight;

    // If the title is a string, wrap in an h1 tag.
    // If not, wrap in a div tag.
    const titleComponent = typeof title === 'string' || title instanceof String ? 'h1' : 'div';

    const titleElement = jsx(titleComponent, {
      onClick: this.handleTitleClick,
      css: prepareStyles(Object.assign(styles.title, styles.mainElement, titleStyle)),
    }, title);

    const iconLeftStyle = Object.assign({}, styles.iconButtonStyle, iconStyleLeft);

    if (showMenuIconButton) {
      if (iconElementLeft) {
        const iconElementLeftProps = {};

        if (iconElementLeft.type.muiName === 'IconButton') {
          const iconElemLeftChildren = iconElementLeft.props.children;
          const iconButtonIconStyle = !(
            iconElemLeftChildren &&
            iconElemLeftChildren.props &&
            iconElemLeftChildren.props.color
          ) ? styles.iconButtonIconStyle : null;

          iconElementLeftProps.iconStyle = Object.assign({}, iconButtonIconStyle, iconElementLeft.props.iconStyle);
        }

        if (!iconElementLeft.props.onClick && this.props.onLeftIconButtonClick) {
          iconElementLeftProps.onClick = this.handleClickLeftIconButton;
        }

        menuElementLeft = (
          <div css={prepareStyles(iconLeftStyle)}>
            {Object.keys(iconElementLeftProps).length > 0 ?
              cloneElement(iconElementLeft, iconElementLeftProps) :
              iconElementLeft}
          </div>
        );
      } else {
        menuElementLeft = (
          <IconButton
            style={iconLeftStyle}
            iconStyle={styles.iconButtonIconStyle}
            iconClassName={iconClassNameLeft}
            onClick={this.handleClickLeftIconButton}
          >
            {iconClassNameLeft ?
              '' :
              <NavigationMenu style={Object.assign({}, styles.iconButtonIconStyle)} />
            }
          </IconButton>
        );
      }
    }

    const iconRightStyle = Object.assign({}, styles.iconButtonStyle, {
      marginRight: -16,
      marginLeft: 'auto',
    }, iconStyleRight);

    if (iconElementRight) {
      const iconElementRightProps = {};

      switch (iconElementRight.type.muiName) {
        case 'IconMenu':
        case 'IconButton':
          const iconElemRightChildren = iconElementRight.props.children;
          const iconButtonIconStyle = !(
            iconElemRightChildren &&
            iconElemRightChildren.props &&
            iconElemRightChildren.props.color
          ) ? styles.iconButtonIconStyle : null;

          iconElementRightProps.iconStyle = Object.assign({}, iconButtonIconStyle, iconElementRight.props.iconStyle);
          break;

        case 'FlatButton':
          iconElementRightProps.style = Object.assign({}, styles.flatButton, iconElementRight.props.style);
          break;

        default:
      }

      if (!iconElementRight.props.onClick && this.props.onRightIconButtonClick) {
        iconElementRightProps.onClick = this.handleClickRightIconButton;
      }

      menuElementRight = (
        <div css={prepareStyles(iconRightStyle)}>
          {Object.keys(iconElementRightProps).length > 0 ?
            cloneElement(iconElementRight, iconElementRightProps) :
            iconElementRight}
        </div>
      );
    } else if (iconClassNameRight) {
      menuElementRight = (
        <IconButton
          style={iconRightStyle}
          iconStyle={styles.iconButtonIconStyle}
          iconClassName={iconClassNameRight}
          onClick={this.handleClickRightIconButton}
        />
      );
    }

    return (
      <Paper
        {...other}
        rounded={false}
        className={className}
        style={Object.assign({}, styles.root, style)}
        zDepth={zDepth}
      >
        {menuElementLeft}
        {titleElement}
        {menuElementRight}
        {children}
      </Paper>
    );
  }
}

export default withTheme(AppBar);
