import { Children, isValidElement, Component } from 'react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';

function getStyles(props) {
  return {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: -props.padding / 2,
    },
    item: {
      boxSizing: 'border-box',
      padding: props.padding / 2,
    },
  };
}

class GridList extends Component {
  static propTypes = {
    /**
     * Number of px for one cell height.
     * You can set `'auto'` if you want to let the children determine the height.
     */
    cellHeight: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['auto']),
    ]),
    /**
     * Grid Tiles that will be in Grid List.
     */
    children: PropTypes.node,
    /**
     * Number of columns.
     */
    cols: PropTypes.number,
    /**
     * Number of px for the padding/spacing between items.
     */
    padding: PropTypes.number,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static defaultProps = {
    cols: 2,
    padding: 4,
    cellHeight: 180,
  };

  render() {
    const {
      cols,
      padding,
      cellHeight,
      children,
      style,
      muiTheme,
      ...other
    } = this.props;

    const {prepareStyles} = muiTheme;
    const styles = getStyles(this.props);
    const mergedRootStyles = Object.assign(styles.root, style);

    const wrappedChildren = Children.map(children, (currentChild) => {
      if (isValidElement(currentChild) && currentChild.type.muiName === 'Subheader') {
        return currentChild;
      }
      const childCols = currentChild.props.cols || 1;
      const childRows = currentChild.props.rows || 1;
      const itemStyle = Object.assign({}, styles.item, {
        width: `${(100 / cols * childCols)}%`,
        height: cellHeight === 'auto' ? 'auto' : cellHeight * childRows + padding,
      });

      return <div css={prepareStyles(itemStyle)}>{currentChild}</div>;
    });

    return (
      <div css={prepareStyles(mergedRootStyles)} {...other}>
        {wrappedChildren}
      </div>
    );
  }
}

export default withTheme(GridList);
