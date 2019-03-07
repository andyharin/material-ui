import {Component} from 'react';
import PropTypes from 'prop-types';
import {unstable_renderSubtreeIntoContainer, unmountComponentAtNode} from 'react-dom';
import withTheme from '../styles/withTheme';

import Dom from '../utils/dom';

// heavily inspired by https://github.com/Khan/react-components/blob/master/js/layered-component-mixin.jsx
class RenderToLayer extends Component {
  static propTypes = {
    componentClickAway: PropTypes.func,
    open: PropTypes.bool.isRequired,
    render: PropTypes.func.isRequired,
    useLayerForClickAway: PropTypes.bool,
  };

  static defaultProps = {
    useLayerForClickAway: true,
  };

  componentDidMount() {
    this.renderLayer();
  }

  componentDidUpdate() {
    this.renderLayer();
  }

  componentWillUnmount() {
    this.unrenderLayer();
  }

  onClickAway = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    if (!this.props.componentClickAway) {
      return;
    }

    if (!this.props.open) {
      return;
    }

    const el = this.layer;
    if (event.target !== el && event.target === window ||
      (document.documentElement.contains(event.target) && !Dom.isDescendant(el, event.target))) {
      this.props.componentClickAway(event);
    }
  };

  getLayer() {
    return this.layer;
  }

  unrenderLayer() {
    if (!this.layer) {
      return;
    }

    if (this.props.useLayerForClickAway) {
      this.layer.style.position = 'relative';
      this.layer.removeEventListener('click', this.onClickAway);
    } else {
      window.removeEventListener('click', this.onClickAway);
    }

    unmountComponentAtNode(this.layer);
    document.body.removeChild(this.layer);
    this.layer = null;
  }

  /**
   * By calling this method in componentDidMount() and
   * componentDidUpdate(), you're effectively creating a "wormhole" that
   * funnels React's hierarchical updates through to a DOM node on an
   * entirely different part of the page.
   */
  renderLayer() {
    const {
      open,
      render,
    } = this.props;

    if (open) {
      if (!this.layer) {
        this.layer = document.createElement('div');
        document.body.appendChild(this.layer);

        if (this.props.useLayerForClickAway) {
          this.layer.addEventListener('click', this.onClickAway);
          this.layer.style.position = 'fixed';
          this.layer.style.top = 0;
          this.layer.style.bottom = 0;
          this.layer.style.left = 0;
          this.layer.style.right = 0;
          this.layer.style.zIndex = this.props.muiTheme.zIndex.layer;
        } else {
          setTimeout(() => {
            window.addEventListener('click', this.onClickAway);
          }, 0);
        }
      }

      const layerElement = render();
      this.layerElement = unstable_renderSubtreeIntoContainer(this, layerElement, this.layer);
    } else {
      this.unrenderLayer();
    }
  }

  render() {
    return null;
  }
}

export default withTheme(RenderToLayer);
