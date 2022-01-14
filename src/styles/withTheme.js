import { forwardRef, useContext } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import Context from './Context';
import isReact from 'is-react';

export default function withTheme(Component) {
  const WrappedComponent = forwardRef((props, _ref) => {
    const context = useContext(Context);
    const ref = isReact.classComponent(Component) ? _ref : undefined;

    return <Component ref={ref} {...props} {...context} />;
  });

  WrappedComponent.displayName = `WithTheme(${Component.displayName ||
    'Anonymous'})`;

  return hoistNonReactStatics(WrappedComponent, Component);
}
