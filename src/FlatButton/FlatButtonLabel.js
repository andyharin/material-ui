import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';

function getStyles(props) {
  const {baseTheme} = props.muiTheme;

  return {
    root: {
      position: 'relative',
      paddingLeft: baseTheme.spacing.desktopGutterLess,
      paddingRight: baseTheme.spacing.desktopGutterLess,
      verticalAlign: 'middle',
    },
  };
}

class FlatButtonLabel extends Component {
  static propTypes = {
    label: PropTypes.node,
    style: PropTypes.object,
  };

  render() {
    const {
      label,
      style,
    } = this.props;

    const {prepareStyles} = this.props.muiTheme;
    const styles = getStyles(this.props);

    return (
      <span style={prepareStyles(Object.assign(styles.root, style))}>{label}</span>
    );
  }
}

export default withTheme(FlatButtonLabel);
