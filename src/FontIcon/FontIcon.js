import { Component } from 'react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';
import transitions from '../styles/transitions';

function getStyles(props, state) {
  const {
    color,
    hoverColor,
  } = props;

  const {baseTheme} = props.muiTheme;
  const offColor = color || baseTheme.palette.textColor;
  const onColor = hoverColor || offColor;

  return {
    root: {
      color: state.hovered ? onColor : offColor,
      position: 'relative',
      fontSize: baseTheme.spacing.iconSize,
      display: 'inline-block',
      userSelect: 'none',
      transition: transitions.easeOut(),
    },
  };
}

class FontIcon extends Component {
  static muiName = 'FontIcon';

  static propTypes = {
    /**
     * This is the font color of the font icon. If not specified,
     * this component will default to muiTheme.palette.textColor.
     */
    color: PropTypes.string,
    /**
     * This is the icon color when the mouse hovers over the icon.
     */
    hoverColor: PropTypes.string,
    /** @ignore */
    onMouseEnter: PropTypes.func,
    /** @ignore */
    onMouseLeave: PropTypes.func,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static defaultProps = {
    onMouseEnter: () => {},
    onMouseLeave: () => {},
  };

  state = {
    hovered: false,
  };

  handleMouseLeave = (event) => {
    // hover is needed only when a hoverColor is defined
    if (this.props.hoverColor !== undefined) {
      this.setState({hovered: false});
    }
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  };

  handleMouseEnter = (event) => {
    // hover is needed only when a hoverColor is defined
    if (this.props.hoverColor !== undefined) {
      this.setState({hovered: true});
    }
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  };

  render() {
    const {
      hoverColor, // eslint-disable-line no-unused-vars
      onMouseLeave, // eslint-disable-line no-unused-vars
      onMouseEnter, // eslint-disable-line no-unused-vars
      style,
      muiTheme,
      ...other
    } = this.props;

    const {prepareStyles} = muiTheme;
    const styles = getStyles(this.props, this.state);

    return (
      <span
        {...other}
        onMouseLeave={this.handleMouseLeave}
        onMouseEnter={this.handleMouseEnter}
        css={prepareStyles(Object.assign(styles.root, style))}
      />
    );
  }
}

export default withTheme(FontIcon);
