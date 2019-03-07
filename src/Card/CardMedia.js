import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';

function getStyles(props) {
  const {cardMedia} = props.muiTheme;

  return {
    root: {
      position: 'relative',
    },
    overlayContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
    overlay: {
      height: '100%',
      position: 'relative',
    },
    overlayContent: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      paddingTop: 8,
      background: cardMedia.overlayContentBackground,
    },
    media: {},
    mediaChild: {
      verticalAlign: 'top',
      maxWidth: '100%',
      minWidth: '100%',
      width: '100%',
    },
  };
}

class CardMedia extends Component {
  static propTypes = {
    /**
     * If true, a click on this card component expands the card.
     */
    actAsExpander: PropTypes.bool,
    /**
     * Can be used to render elements inside the Card Media.
     */
    children: PropTypes.node,
    /**
     * If true, this card component is expandable.
     */
    expandable: PropTypes.bool,
    /**
     * Override the inline-styles of the Card Media.
     */
    mediaStyle: PropTypes.object,
    /**
     * Can be used to render overlay element in Card Media.
     */
    overlay: PropTypes.node,
    /**
     * Override the inline-styles of the overlay container.
     */
    overlayContainerStyle: PropTypes.object,
    /**
     * Override the inline-styles of the overlay content.
     */
    overlayContentStyle: PropTypes.object,
    /**
     * Override the inline-styles of the overlay element.
     */
    overlayStyle: PropTypes.object,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  render() {
    const {
      actAsExpander, // eslint-disable-line no-unused-vars
      children,
      expandable, // eslint-disable-line no-unused-vars
      mediaStyle,
      overlay,
      overlayContainerStyle,
      overlayContentStyle,
      overlayStyle,
      style,
      muiTheme,
      ...other
    } = this.props;

    const {prepareStyles} = muiTheme;
    const styles = getStyles(this.props);
    const rootStyle = Object.assign(styles.root, style);
    const extendedMediaStyle = Object.assign(styles.media, mediaStyle);
    const extendedOverlayContainerStyle = Object.assign(styles.overlayContainer, overlayContainerStyle);
    const extendedOverlayContentStyle = Object.assign(styles.overlayContent, overlayContentStyle);
    const extendedOverlayStyle = Object.assign(styles.overlay, overlayStyle);
    const titleColor = this.props.muiTheme.cardMedia.titleColor;
    const subtitleColor = this.props.muiTheme.cardMedia.subtitleColor;
    const color = this.props.muiTheme.cardMedia.color;

    const styledChildren = React.Children.map(children, (child) => {
      if (!child) {
        return child;
      }

      return React.cloneElement(child, {
        style: prepareStyles(Object.assign({}, styles.mediaChild, child.props.style)),
      });
    });

    const overlayChildren = React.Children.map(overlay, (child) => {
      const childMuiName = (child && child.type) ? child.type.muiName : null;

      if (childMuiName === 'CardHeader' || childMuiName === 'CardTitle') {
        return React.cloneElement(child, {
          titleColor: titleColor,
          subtitleColor: subtitleColor,
        });
      } else if (childMuiName === 'CardText') {
        return React.cloneElement(child, {
          color: color,
        });
      } else {
        return child;
      }
    });

    return (
      <div {...other} style={prepareStyles(rootStyle)}>
        <div style={prepareStyles(extendedMediaStyle)}>
          {styledChildren}
        </div>
        {overlay ?
          <div style={prepareStyles(extendedOverlayContainerStyle)}>
            <div style={prepareStyles(extendedOverlayStyle)}>
              <div style={prepareStyles(extendedOverlayContentStyle)}>
                {overlayChildren}
              </div>
            </div>
          </div> : ''}
      </div>
    );
  }
}

export default withTheme(CardMedia);
