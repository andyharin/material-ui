import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';

function getStyles(props) {
  const {noGutter} = props;

  const {
    baseTheme,
    toolbar,
  } = props.muiTheme;

  return {
    root: {
      boxSizing: 'border-box',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      backgroundColor: toolbar.backgroundColor,
      height: toolbar.height,
      padding: noGutter ? 0 : `0px ${baseTheme.spacing.desktopGutter}px`,
      display: 'flex',
      justifyContent: 'space-between',
    },
  };
}

class Toolbar extends Component {
  static propTypes = {
    /**
     * Can be a `ToolbarGroup` to render a group of related items.
     */
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Do not apply `desktopGutter` to the `Toolbar`.
     */
    noGutter: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static defaultProps = {
    noGutter: false,
  };

  render() {
    const {
      children,
      className,
      noGutter, // eslint-disable-line no-unused-vars
      style,
      muiTheme,
      ...other
    } = this.props;

    const {prepareStyles} = this.props.muiTheme;
    const styles = getStyles(this.props);

    return (
      <div {...other} className={className} style={prepareStyles(Object.assign({}, styles.root, style))}>
        {children}
      </div>
    );
  }
}

export default withTheme(Toolbar);
