import { Component, Children, isValidElement } from 'react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';
import Subheader from '../Subheader';

class List extends Component {
  static propTypes = {
    /**
     * These are usually `ListItem`s that are passed to
     * be part of the list.
     */
    children: PropTypes.node,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  render() {
    const {
      children,
      style,
      muiTheme,
      ...other
    } = this.props;

    const {prepareStyles} = muiTheme;

    let hasSubheader = false;

    const firstChild = Children.toArray(children)[0];
    if (isValidElement(firstChild) && firstChild.type === Subheader) {
      hasSubheader = true;
    }

    const styles = {
      root: {
        padding: `${hasSubheader ? 0 : 8}px 0px 8px 0px`,
      },
    };

    return (
      <div {...other} css={prepareStyles(Object.assign(styles.root, style))}>
        {children}
      </div>
    );
  }
}

export default withTheme(List);
