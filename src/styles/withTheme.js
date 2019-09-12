import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import Context from './Context';

export default function withTheme(Component) {
  const WrappedComponent = React.forwardRef((props, ref) => {
    const context = React.useContext(Context);

    return <Component ref={ref} {...props} {...context} />;
  });

  WrappedComponent.displayName = `withTheme(${Component.displayName ||
    'unknown'})`;

  return hoistNonReactStatics(React.memo(WrappedComponent), Component);
}
