import { Children, cloneElement, isValidElement, Component } from 'react';
import {jsx} from '@emotion/react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';

function getStyles(props) {
  const {
    baseTheme,
    gridTile,
  } = props.muiTheme;

  const actionPos = props.actionIcon && props.actionPosition;

  const styles = {
    root: {
      position: 'relative',
      display: 'block',
      height: '100%',
      overflow: 'hidden',
    },
    titleBar: {
      position: 'absolute',
      left: 0,
      right: 0,
      [props.titlePosition]: 0,
      height: props.subtitle ? 68 : 48,
      background: props.titleBackground,
      display: 'flex',
      alignItems: 'center',
    },
    titleWrap: {
      flexGrow: 1,
      marginLeft: actionPos !== 'left' ? baseTheme.spacing.desktopGutterLess : 0,
      marginRight: actionPos === 'left' ? baseTheme.spacing.desktopGutterLess : 0,
      color: gridTile.textColor,
      overflow: 'hidden',
    },
    title: {
      fontSize: '16px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    subtitle: {
      fontSize: '12px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    actionIcon: {
      order: actionPos === 'left' ? -1 : 1,
    },
    childImg: {
      height: '100%',
      transform: 'translateX(-50%)',
      position: 'relative',
      left: '50%',
    },
  };
  return styles;
}

class GridTile extends Component {
  static propTypes = {
    /**
     * An IconButton element to be used as secondary action target
     * (primary action target is the tile itself).
     */
    actionIcon: PropTypes.element,
    /**
     * Position of secondary action IconButton.
     */
    actionPosition: PropTypes.oneOf(['left', 'right']),
    /**
     * Theoretically you can pass any node as children, but the main use case is to pass an img,
     * in whichcase GridTile takes care of making the image "cover" available space
     * (similar to background-size: cover or to object-fit:cover).
     */
    children: PropTypes.node,
    /**
     * Width of the tile in number of grid cells.
     */
    cols: PropTypes.number,
    /**
     * Either a string used as tag name for the tile root element, or a ReactElement.
     * This is useful when you have, for example, a custom implementation of
     * a navigation link (that knows about your routes) and you want to use it as the primary tile action.
     * In case you pass a ReactElement, please ensure that it passes all props,
     * accepts styles overrides and render it's children.
     */
    containerElement: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    /**
     * Height of the tile in number of grid cells.
     */
    rows: PropTypes.number,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * String or element serving as subtitle (support text).
     */
    subtitle: PropTypes.node,
    /**
     * Override the inline-styles of the subtitle element.
     */
    subtitleStyle: PropTypes.object,
    /**
     * Title to be displayed on tile.
     */
    title: PropTypes.node,
    /**
     * Style used for title bar background.
     * Useful for setting custom gradients for example
     */
    titleBackground: PropTypes.string,
    /**
     * Position of the title bar (container of title, subtitle and action icon).
     */
    titlePosition: PropTypes.oneOf(['top', 'bottom']),
    /**
     * Override the inline-styles of the title element.
     */
    titleStyle: PropTypes.object,
  };

  static defaultProps = {
    titlePosition: 'bottom',
    titleBackground: 'rgba(0, 0, 0, 0.4)',
    actionPosition: 'right',
    cols: 1,
    rows: 1,
    containerElement: 'div',
  };

  componentDidMount() {
    this.ensureImageCover();
  }

  componentDidUpdate() {
    this.ensureImageCover();
  }

  ensureImageCover() {
    let imgEl = this.refs.img;

    if (imgEl) {
      const fit = () => {
        if (imgEl.offsetWidth < imgEl.parentNode.offsetWidth) {
          const {isRtl} = this.props.muiTheme;
          imgEl.style.height = 'auto';
          if (isRtl) {
            imgEl.style.right = '0';
          } else {
            imgEl.style.left = '0';
          }
          imgEl.style.width = '100%';
          imgEl.style.top = '50%';
          imgEl.style.transform = imgEl.style.WebkitTransform = 'translateY(-50%)';
        }
        imgEl.removeEventListener('load', fit);
        imgEl = null; // prevent closure memory leak
      };
      if (imgEl.complete) {
        fit();
      } else {
        imgEl.addEventListener('load', fit);
      }
    }
  }

  render() {
    const {
      title,
      subtitle,
      titlePosition, // eslint-disable-line no-unused-vars
      titleBackground, // eslint-disable-line no-unused-vars
      titleStyle,
      subtitleStyle,
      actionIcon, // eslint-disable-line no-unused-vars
      actionPosition, // eslint-disable-line no-unused-vars
      style,
      children,
      containerElement,
      ...other
    } = this.props;

    const {prepareStyles} = this.props.muiTheme;
    const styles = getStyles(this.props);
    const mergedRootStyles = Object.assign(styles.root, style);

    let titleBar = null;

    if (title) {
      titleBar = (
        <div key="titlebar" css={prepareStyles(styles.titleBar)}>
          <div css={prepareStyles(styles.titleWrap)}>
            <div css={prepareStyles(Object.assign(styles.title, titleStyle))}>
              {title}
            </div>
            {subtitle ? (
              <div css={prepareStyles(Object.assign(styles.subtitle, subtitleStyle))}>
                {subtitle}
              </div>
            ) : null}
          </div>
          {actionIcon ? (
            <div css={prepareStyles(styles.actionIcon)}>
              {actionIcon}
            </div>
          ) : null}
        </div>
      );
    }

    let newChildren = children;

    // if there is a single image passed as children
    // clone it and add our styles
    if (Children.count(children) === 1) {
      newChildren = Children.map(children, (child) => {
        if (child.type === 'img') {
          return cloneElement(child, {
            key: 'img',
            ref: 'img',
            style: prepareStyles(Object.assign({}, styles.childImg, child.props.style)),
          });
        } else {
          return child;
        }
      });
    }

    const containerProps = {
      style: prepareStyles(mergedRootStyles),
      ...other,
    };

    return isValidElement(containerElement) ?
      cloneElement(containerElement, containerProps, [newChildren, titleBar]) :
      jsx(containerElement, containerProps, [newChildren, titleBar]);
  }
}

export default withTheme(GridTile);
