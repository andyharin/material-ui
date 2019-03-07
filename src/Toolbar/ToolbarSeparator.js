import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';

function getStyles(props) {
  const {
    baseTheme,
    toolbar,
  } = props.muiTheme;

  return {
    root: {
      backgroundColor: toolbar.separatorColor,
      display: 'block',
      height: baseTheme.spacing.desktopGutterMore,
      marginLeft: baseTheme.spacing.desktopGutter,
      width: 1,
    },
  };
}

class ToolbarSeparator extends Component {
  static muiName = 'ToolbarSeparator';

  static propTypes = {
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  render() {
    const {
      className,
      style,
      ...other
    } = this.props;

    const {prepareStyles} = this.props.muiTheme;
    const styles = getStyles(this.props);

    return (
      <span {...other} className={className} style={prepareStyles(Object.assign({}, styles.root, style))} />
    );
  }
}

export default withTheme(ToolbarSeparator);
