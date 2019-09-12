import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import Context from './Context';
import isReact from 'is-react';

export default function withTheme(Component) {
  const WrappedComponent = React.forwardRef((props, _ref) => {
    const context = React.useContext(Context);
    const ref = isReact.classComponent(Component) ? _ref : undefined;

    return <Component {...props} ref={ref} {...context} />;
  });

  WrappedComponent.displayName = `withTheme(${Component.displayName ||
    'unknown'})`;

  return hoistNonReactStatics(React.memo(WrappedComponent), Component);
}
