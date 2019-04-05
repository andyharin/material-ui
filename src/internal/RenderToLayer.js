import {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import withTheme from '../styles/withTheme';
import Dom, {canUseDom} from '../utils/dom';

const document = canUseDom ? window.document : undefined;
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
  constructor(props) {
    super(props);
    this.layer = {style: {}};
    if (!canUseDom) return;
    if (!document) return;
    this.layer = document.createElement('div');
    document.body.appendChild(this.layer);

    if (this.props.useLayerForClickAway) {
      this.layer.style.display = 'block';
      this.layer.style.position = 'fixed';
      this.layer.style.top = 0;
      this.layer.style.bottom = 0;
      this.layer.style.left = 0;
      this.layer.style.right = 0;
      this.layer.style.zIndex = this.props.muiTheme.zIndex.layer;
    }
  }
  state = {isOpen: false}

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.open !== prevState.open) return {isOpen: nextProps.open};
    return null;
  }
  componentDidMount() {
    this.renderLayer();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.isOpen !== this.state.isOpen) this.renderLayer();
  }
  componentWillUnmount() {
    this.unrenderLayer();
  }

  onClickAway = (event) => {
    if (!canUseDom || !document) {
      return;
    }

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
    this.setState({isOpen: false});
  }

  /**
   * By calling this method in componentDidMount() and
   * componentDidUpdate(), you're effectively creating a "wormhole" that
   * funnels React's hierarchical updates through to a DOM node on an
   * entirely different part of the page.
   */
  renderLayer(props = this.props, state = this.state) {
    if (!canUseDom || !document) {
      return null;
    }
    if (state.isOpen) {
      if (props.useLayerForClickAway) {
        this.layer.style.position = 'fixed';
        this.layer.addEventListener('click', this.onClickAway);
      } else {
        setTimeout(() => {
          window.addEventListener('click', this.onClickAway);
        }, 100);
      }
      this.layer.style.display = 'block';
    } else {
      if (props.useLayerForClickAway) {
        this.layer.style.position = 'relative';
        this.layer.removeEventListener('click', this.onClickAway);
      } else {
        window.removeEventListener('click', this.onClickAway);
      }
      this.layer.style.display = 'none';
    }
  }

  render() {
    if (!canUseDom || !document || !this.layer || !this.state.isOpen) return null;
    const layerElement = this.props.render();
    return ReactDOM.createPortal(layerElement, this.layer);
  }
}

export default withTheme(RenderToLayer);
