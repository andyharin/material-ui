import { isValidElement, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import shallowEqual from 'recompose/shallowEqual';
import withTheme from '../styles/withTheme';
import {fade} from '../utils/colorManipulator';
import transitions from '../styles/transitions';
import EnhancedButton from '../internal/EnhancedButton';
import IconButton from '../IconButton';
import OpenIcon from '../svg-icons/navigation/expand-less';
import CloseIcon from '../svg-icons/navigation/expand-more';
import NestedList from './NestedList';

function getStyles(props, state) {
  const {
    autoGenerateNestedIndicator,
    insetChildren,
    leftAvatar,
    leftCheckbox,
    leftIcon,
    nestedItems,
    nestedLevel,
    rightAvatar,
    rightIcon,
    rightIconButton,
    rightToggle,
    secondaryText,
    secondaryTextLines,
  } = props;

  const {muiTheme} = props;
  const {listItem} = muiTheme;

  const textColor = muiTheme.baseTheme.palette.textColor;
  const hoverColor = props.hoverColor || fade(textColor, 0.1);
  const singleAvatar = !secondaryText && (leftAvatar || rightAvatar);
  const singleNoAvatar = !secondaryText && !(leftAvatar || rightAvatar);
  const twoLine = secondaryText && secondaryTextLines === 1;
  const threeLine = secondaryText && secondaryTextLines > 1;

  const isKeyboardFocused =
    (props.isKeyboardFocused !== undefined ? props : state).isKeyboardFocused;

  const styles = {
    root: {
      backgroundColor: (isKeyboardFocused || state.hovered) &&
      !state.rightIconButtonHovered &&
      !state.rightIconButtonKeyboardFocused ? hoverColor : null,
      color: textColor,
      display: 'block',
      fontSize: 16,
      lineHeight: '16px',
      position: 'relative',
      transition: transitions.easeOut(),
    },

    // This inner div is needed so that ripples will span the entire container
    innerDiv: {
      marginLeft: nestedLevel * listItem.nestedLevelDepth,
      paddingLeft: leftIcon || leftAvatar || leftCheckbox || insetChildren ? 72 : 16,
      paddingRight: rightIcon || rightAvatar || rightIconButton ||
                    (nestedItems.length && autoGenerateNestedIndicator) ?
                    56 : rightToggle ? 72 : 16,
      paddingBottom: singleAvatar ? 20 : 16,
      paddingTop: singleNoAvatar || threeLine ? 16 : 20,
      position: 'relative',
    },

    icons: {
      height: 24,
      width: 24,
      display: 'block',
      position: 'absolute',
      top: twoLine ? 12 : singleAvatar ? 4 : 0,
      margin: 12,
    },

    leftIcon: {
      left: 4,
    },

    rightIcon: {
      right: 4,
    },

    avatars: {
      position: 'absolute',
      top: singleAvatar ? 8 : 16,
    },

    label: {
      cursor: 'pointer',
    },

    leftAvatar: {
      left: 16,
    },

    rightAvatar: {
      right: 16,
    },

    leftCheckbox: {
      position: 'absolute',
      display: 'block',
      width: 24,
      top: twoLine ? 24 : singleAvatar ? 16 : 12,
      left: 16,
    },

    primaryText: {
    },

    rightIconButton: {
      position: 'absolute',
      display: 'block',
      top: twoLine ? 12 : singleAvatar ? 4 : 0,
      right: 4,
    },

    rightToggle: {
      position: 'absolute',
      display: 'block',
      width: 54,
      top: twoLine ? 25 : singleAvatar ? 17 : 13,
      right: 8,
    },

    secondaryText: {
      fontSize: 14,
      lineHeight: threeLine ? '18px' : '16px',
      height: threeLine ? 36 : 16,
      margin: 0,
      marginTop: 4,
      color: listItem.secondaryTextColor,

      // needed for 2 and 3 line ellipsis
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: threeLine ? null : 'nowrap',
      display: threeLine ? '-webkit-box' : null,
      WebkitLineClamp: threeLine ? 2 : null,
      WebkitBoxOrient: threeLine ? 'vertical' : null,
    },
  };

  return styles;
}

class ListItem extends Component {
  static muiName = 'ListItem';

  static propTypes = {
    /**
     * If true, generate a nested-list-indicator icon when nested list
     * items are detected. Note that an indicator will not be created
     * if a `rightIcon` or `rightIconButton` has been provided to
     * the element.
     */
    autoGenerateNestedIndicator: PropTypes.bool,
    /**
     * Children passed into the `ListItem`.
     */
    children: PropTypes.node,
    /**
     * The element to use as the container for the ListItem. Either a string to
     * use a DOM element or a ReactElement. This is useful for wrapping the
     * ListItem in a custom Link component. If a ReactElement is given, ensure
     * that it passes all of its given props through to the underlying DOM
     * element and renders its children prop for proper integration.
     */
    containerElement: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    /**
     * If true, the element will not be able to be focused by the keyboard.
     */
    disableKeyboardFocus: PropTypes.bool,
    /**
     * If true, the element will not be clickable
     * and will not display hover effects.
     * This is automatically disabled if either `leftCheckbox`
     * or `rightToggle` is set.
     */
    disabled: PropTypes.bool,
    /**
    * Override the hover background color.
    */
    hoverColor: PropTypes.string,
    /**
     * If true, the nested `ListItem`s are initially displayed.
     */
    initiallyOpen: PropTypes.bool,
    /**
     * Override the inline-styles of the inner div element.
     */
    innerDivStyle: PropTypes.object,
    /**
     * If true, the children will be indented by 72px.
     * This is useful if there is no left avatar or left icon.
     */
    insetChildren: PropTypes.bool,
    /**
     * Use to control if the list item should render as keyboard focused.  If
     * undefined (default), this will be automatically managed.  If provided,
     * it will change the components style.  Note that this will not change the
     * actual focus - and should only be used when you want to simulate
     * keyboard focus (eg. in a rich text input autocomplete).
     */
    isKeyboardFocused: PropTypes.bool,
    /**
     * This is the `Avatar` element to be displayed on the left side.
     */
    leftAvatar: PropTypes.element,
    /**
     * This is the `Checkbox` element to be displayed on the left side.
     */
    leftCheckbox: PropTypes.element,
    /**
     * This is the `SvgIcon` or `FontIcon` to be displayed on the left side.
     */
    leftIcon: PropTypes.element,
    /**
     * An array of `ListItem`s to nest underneath the current `ListItem`.
     */
    nestedItems: PropTypes.arrayOf(PropTypes.element),
    /**
     * Controls how deep a `ListItem` appears.
     * This property is automatically managed, so modify at your own risk.
     */
    nestedLevel: PropTypes.number,
    /**
     * Override the inline-styles of the nested items' `NestedList`.
     */
    nestedListStyle: PropTypes.object,
    /**
     * Callback function fired when the list item is clicked.
     *
     * @param {object} event Click event targeting the list item.
     */
    onClick: PropTypes.func,
    /**
     * Callback function fired when the `ListItem` is focused or blurred by the keyboard.
     *
     * @param {object} event `focus` or `blur` event targeting the `ListItem`.
     * @param {boolean} isKeyboardFocused If true, the `ListItem` is focused.
     */
    onKeyboardFocus: PropTypes.func,
    /** @ignore */
    onMouseEnter: PropTypes.func,
    /** @ignore */
    onMouseLeave: PropTypes.func,
    /**
     * Callback function fired when the `ListItem` toggles its nested list.
     *
     * @param {object} listItem The `ListItem`.
     */
    onNestedListToggle: PropTypes.func,
    /** @ignore */
    onTouchEnd: PropTypes.func,
    /** @ignore */
    onTouchStart: PropTypes.func,
    /**
     * Control toggle state of nested list.
     */
    open: PropTypes.bool,
    /**
     * This is the block element that contains the primary text.
     * If a string is passed in, a div tag will be rendered.
     */
    primaryText: PropTypes.node,
    /**
     * If true, clicking or tapping the primary text of the `ListItem`
     * toggles the nested list.
     */
    primaryTogglesNestedList: PropTypes.bool,
    /**
     * This is the `Avatar` element to be displayed on the right side.
     */
    rightAvatar: PropTypes.element,
    /**
     * This is the `SvgIcon` or `FontIcon` to be displayed on the right side.
     */
    rightIcon: PropTypes.element,
    /**
     * This is the `IconButton` to be displayed on the right side.
     * Hovering over this button will remove the `ListItem` hover.
     * Also, clicking on this button will not trigger a
     * ripple on the `ListItem`; the event will be stopped and prevented
     * from bubbling up to cause a `ListItem` click.
     */
    rightIconButton: PropTypes.element,
    /**
     * This is the `Toggle` element to display on the right side.
     */
    rightToggle: PropTypes.element,
    /**
     * This is the block element that contains the secondary text.
     * If a string is passed in, a div tag will be rendered.
     */
    secondaryText: PropTypes.node,
    /**
     * Can be 1 or 2. This is the number of secondary
     * text lines before ellipsis will show.
     */
    secondaryTextLines: PropTypes.oneOf([1, 2]),
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static defaultProps = {
    autoGenerateNestedIndicator: true,
    containerElement: 'span',
    disableKeyboardFocus: false,
    disabled: false,
    initiallyOpen: false,
    insetChildren: false,
    nestedItems: [],
    nestedLevel: 0,
    onKeyboardFocus: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onNestedListToggle: () => {},
    onTouchEnd: () => {},
    onTouchStart: () => {},
    open: null,
    primaryTogglesNestedList: false,
    secondaryTextLines: 1,
  };

  state = {
    hovered: false,
    isKeyboardFocused: false,
    open: false,
    rightIconButtonHovered: false,
    rightIconButtonKeyboardFocused: false,
    touch: false,
  };

  UNSAFE_componentWillMount() {
    this.setState({
      open: this.props.open === null ? this.props.initiallyOpen === true : this.props.open,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // update the state when the component is controlled.
    if (nextProps.open !== null)
      this.setState({open: nextProps.open});
    if (nextProps.disabled && this.state.hovered)
      this.setState({hovered: false});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) ||
      !shallowEqual(this.state, nextState)
    );
  }

  // This method is needed by the `MenuItem` component.
  applyFocusState(focusState) {
    if (this.button) {
      const buttonEl = ReactDOM.findDOMNode(this.button);

      switch (focusState) {
        case 'none':
          buttonEl.blur();
          break;
        case 'focused':
          buttonEl.focus();
          break;
        case 'keyboard-focused':
          this.button.setKeyboardFocus();
          buttonEl.focus();
          break;
      }
    }
  }

  createDisabledElement(styles, contentChildren, additionalProps) {
    const {
      innerDivStyle,
      style,
    } = this.props;

    const mergedDivStyles = Object.assign({},
      styles.root,
      styles.innerDiv,
      innerDivStyle,
      style
    );

    return (
      <div
        {...additionalProps}
        css={this.props.muiTheme.prepareStyles(mergedDivStyles)}
      >
        {contentChildren}
      </div>
    );
  }

  createLabelElement(styles, contentChildren, additionalProps) {
    const {
      innerDivStyle,
      style,
    } = this.props;

    const mergedLabelStyles = Object.assign({},
      styles.root,
      styles.innerDiv,
      innerDivStyle,
      styles.label,
      style
    );

    return (
      <label
        {...additionalProps}
        style={this.props.muiTheme.prepareStyles(mergedLabelStyles)}
      >
        {contentChildren}
      </label>
    );
  }

  createTextElement(styles, data, key) {
    const {prepareStyles} = this.props.muiTheme;
    if (isValidElement(data)) {
      let style = Object.assign({}, styles, data.props.style);
      if (typeof data.type === 'string') { // if element is a native dom node
        style = prepareStyles(style);
      }
      return cloneElement(data, {
        key: key,
        style: style,
      });
    }

    return (
      <div key={key} css={prepareStyles(styles)}>
        {data}
      </div>
    );
  }

  handleKeyboardFocus = (event, isKeyboardFocused) => {
    this.setState({isKeyboardFocused: isKeyboardFocused});
    this.props.onKeyboardFocus(event, isKeyboardFocused);
  };

  handleMouseEnter = (event) => {
    if (!this.state.touch) this.setState({hovered: true});
    this.props.onMouseEnter(event);
  };

  handleMouseLeave = (event) => {
    this.setState({hovered: false});
    this.props.onMouseLeave(event);
  };

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (this.props.primaryTogglesNestedList) {
      this.handleNestedListToggle(event);
    }
  };

  handleNestedListToggle = (event) => {
    if (this.props.leftCheckbox) {
      event.preventDefault();
    }
    event.stopPropagation();

    if (this.props.open === null) {
      this.setState({open: !this.state.open}, () => {
        this.props.onNestedListToggle(this);
      });
    } else {
      // Exposing `this` in the callback is quite a bad API.
      // I'm doing a one level deep clone to expose a fake state.open.
      this.props.onNestedListToggle({
        ...this,
        state: {
          open: !this.state.open,
        },
      });
    }
  };

  handleRightIconButtonKeyboardFocus = (event, isKeyboardFocused) => {
    if (isKeyboardFocused) {
      this.setState({
        isKeyboardFocused: false,
        rightIconButtonKeyboardFocused: isKeyboardFocused,
      });
    }

    const iconButton = this.props.rightIconButton;

    if (iconButton && iconButton.props.onKeyboardFocus) iconButton.props.onKeyboardFocus(event, isKeyboardFocused);
  };

  handleRightIconButtonMouseLeave = (event) => {
    const iconButton = this.props.rightIconButton;
    this.setState({rightIconButtonHovered: false});
    if (iconButton && iconButton.props.onMouseLeave) iconButton.props.onMouseLeave(event);
  };

  handleRightIconButtonMouseEnter = (event) => {
    const iconButton = this.props.rightIconButton;
    this.setState({rightIconButtonHovered: true});
    if (iconButton && iconButton.props.onMouseEnter) iconButton.props.onMouseEnter(event);
  };

  handleRightIconButtonMouseUp = (event) => {
    const iconButton = this.props.rightIconButton;
    event.stopPropagation();
    if (iconButton && iconButton.props.onMouseUp) iconButton.props.onMouseUp(event);
  };

  handleRightIconButtonClick = (event) => {
    const iconButton = this.props.rightIconButton;

    // Stop the event from bubbling up to the list-item
    event.stopPropagation();
    if (iconButton && iconButton.props.onClick) iconButton.props.onClick(event);
  };

  handleTouchStart = (event) => {
    this.setState({touch: true});
    this.props.onTouchStart(event);
  };

  handleTouchEnd = (event) => {
    this.setState({touch: true});
    this.props.onTouchEnd(event);
  }

  pushElement(children, element, baseStyles, additionalProps) {
    if (element) {
      const styles = Object.assign({}, baseStyles, element.props.style);
      children.push(
        cloneElement(element, {
          key: children.length,
          style: styles,
          ...additionalProps,
        })
      );
    }
  }

  render() {
    const {
      autoGenerateNestedIndicator,
      children,
      containerElement,
      disabled,
      disableKeyboardFocus,
      hoverColor, // eslint-disable-line no-unused-vars
      initiallyOpen, // eslint-disable-line no-unused-vars
      innerDivStyle,
      insetChildren, // eslint-disable-line no-unused-vars
      leftAvatar,
      leftCheckbox,
      leftIcon,
      nestedItems,
      nestedLevel,
      nestedListStyle,
      onKeyboardFocus, // eslint-disable-line no-unused-vars
      isKeyboardFocused, // eslint-disable-line no-unused-vars
      onMouseEnter, // eslint-disable-line no-unused-vars
      onMouseLeave, // eslint-disable-line no-unused-vars
      onNestedListToggle, // eslint-disable-line no-unused-vars
      onTouchStart, // eslint-disable-line no-unused-vars
      onClick, // eslint-disable-line no-unused-vars
      rightAvatar,
      rightIcon,
      rightIconButton,
      rightToggle,
      primaryText,
      primaryTogglesNestedList,
      secondaryText,
      secondaryTextLines, // eslint-disable-line no-unused-vars
      style,
      muiTheme,
      ...other
    } = this.props;

    const {prepareStyles} = muiTheme;
    const styles = getStyles(this.props, this.state);
    const contentChildren = [children];

    if (leftIcon) {
      const additionalProps = {
        color: leftIcon.props.color || muiTheme.listItem.leftIconColor,
      };
      this.pushElement(
        contentChildren,
        leftIcon,
        Object.assign({}, styles.icons, styles.leftIcon),
        additionalProps
      );
    }

    if (rightIcon) {
      const additionalProps = {
        color: rightIcon.props.color || muiTheme.listItem.rightIconColor,
      };
      this.pushElement(
        contentChildren,
        rightIcon,
        Object.assign({}, styles.icons, styles.rightIcon),
        additionalProps
      );
    }

    if (leftAvatar) {
      this.pushElement(
        contentChildren,
        leftAvatar,
        Object.assign({}, styles.avatars, styles.leftAvatar)
      );
    }

    if (rightAvatar) {
      this.pushElement(
        contentChildren,
        rightAvatar,
        Object.assign({}, styles.avatars, styles.rightAvatar)
      );
    }

    if (leftCheckbox) {
      this.pushElement(
        contentChildren,
        leftCheckbox,
        Object.assign({}, styles.leftCheckbox)
      );
    }

    // RightIconButtonElement
    const hasNestListItems = nestedItems.length;
    const hasRightElement = rightAvatar || rightIcon || rightIconButton || rightToggle;
    const needsNestedIndicator = hasNestListItems && autoGenerateNestedIndicator && !hasRightElement;

    if (rightIconButton || needsNestedIndicator) {
      let rightIconButtonElement = rightIconButton;
      const rightIconButtonHandlers = {
        onKeyboardFocus: this.handleRightIconButtonKeyboardFocus,
        onMouseEnter: this.handleRightIconButtonMouseEnter,
        onMouseLeave: this.handleRightIconButtonMouseLeave,
        onClick: this.handleRightIconButtonClick,
        onMouseDown: this.handleRightIconButtonMouseUp,
        onMouseUp: this.handleRightIconButtonMouseUp,
      };

      // Create a nested list indicator icon if we don't have an icon on the right
      if (needsNestedIndicator) {
        rightIconButtonElement = this.state.open ?
          <IconButton><OpenIcon /></IconButton> :
          <IconButton><CloseIcon /></IconButton>;
        rightIconButtonHandlers.onClick = this.handleNestedListToggle;
      }

      this.pushElement(
        contentChildren,
        rightIconButtonElement,
        Object.assign({}, styles.rightIconButton),
        rightIconButtonHandlers
      );
    }

    if (rightToggle) {
      this.pushElement(
        contentChildren,
        rightToggle,
        Object.assign({}, styles.rightToggle)
      );
    }

    if (primaryText) {
      const primaryTextElement = this.createTextElement(
        styles.primaryText,
        primaryText,
        'primaryText'
      );
      contentChildren.push(primaryTextElement);
    }

    if (secondaryText) {
      const secondaryTextElement = this.createTextElement(
        styles.secondaryText,
        secondaryText,
        'secondaryText'
      );
      contentChildren.push(secondaryTextElement);
    }

    const nestedList = nestedItems.length ? (
      <NestedList nestedLevel={nestedLevel} open={this.state.open} style={nestedListStyle}>
        {nestedItems}
      </NestedList>
    ) : undefined;

    const simpleLabel = !primaryTogglesNestedList && (leftCheckbox || rightToggle);

    return (
      <div>
        {
          simpleLabel ? this.createLabelElement(styles, contentChildren, other) :
          disabled ? this.createDisabledElement(styles, contentChildren, other) : (
            <EnhancedButton
              containerElement={containerElement}
              {...other}
              disableKeyboardFocus={disableKeyboardFocus || this.state.rightIconButtonKeyboardFocused}
              onKeyboardFocus={this.handleKeyboardFocus}
              onMouseLeave={this.handleMouseLeave}
              onMouseEnter={this.handleMouseEnter}
              onTouchStart={this.handleTouchStart}
              onTouchEnd={this.handleTouchEnd}
              onClick={this.handleClick}
              disabled={disabled}
              ref={(node) => this.button = node}
              style={Object.assign({}, styles.root, style)}
            >
              <div css={prepareStyles(Object.assign(styles.innerDiv, innerDivStyle))}>
                {contentChildren}
              </div>
            </EnhancedButton>
          )
        }
        {nestedList}
      </div>
    );
  }
}

export default withTheme(ListItem);
