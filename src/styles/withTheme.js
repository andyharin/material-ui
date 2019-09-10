import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import {Consumer} from './Context';

export default (Component) => {
  const render = (innerRef, p) => (contexts) => {
    if (!(contexts || {}).muiTheme) return null;
    return <Component {...p} ref={innerRef} {...contexts} />;
  };
  const Wrapper = hoistNonReactStatics(({innerRef, ...p}) => <Consumer>{render(innerRef, p)}</Consumer>, Component);
  return React.forwardRef((props, ref) => <Wrapper {...props} innerRef={ref} />);
};
