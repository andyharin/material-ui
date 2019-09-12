import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Consumer } from './Context';
import isReact from 'is-react';

export default function withTheme(Component) {
  const render = (innerRef, props) => context => {
    return <Component {...props} ref={innerRef} {...context} />;
  };

  const WrappedComponent = React.forwardRef(function Component(props, _ref) {
    const ref = isReact.classComponent(Component) ? _ref : undefined;

    return <Consumer>{render(ref, props)}</Consumer>;
  });

  return hoistNonReactStatics(React.memo(WrappedComponent), Component);
});
