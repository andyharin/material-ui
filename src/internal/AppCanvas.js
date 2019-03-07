import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';

class AppCanvas extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const {
      baseTheme,
      prepareStyles,
    } = this.props.muiTheme;

    const styles = {
      height: '100%',
      color: baseTheme.palette.textColor,
      backgroundColor: baseTheme.palette.canvasColor,
      direction: 'ltr',
    };

    const newChildren = React.Children.map(this.props.children, (currentChild) => {
      if (!currentChild) { // If undefined, skip it
        return null;
      }

      switch (currentChild.type.muiName) {
        case 'AppBar' :
          return React.cloneElement(currentChild, {
            style: Object.assign({}, currentChild.props.style, {
              position: 'fixed',
            }),
          });
        default:
          return currentChild;
      }
    }, this);

    return (
      <div style={prepareStyles(styles)}>
        {newChildren}
      </div>
    );
  }
}

export default withTheme(AppCanvas);
