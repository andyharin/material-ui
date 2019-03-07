import React from 'react';
import {Consumer} from './Context';

export default (Component) => {
  const render = (innerRef, p) => (contexts) => {
    if (!(contexts || {}).muiTheme) return null;
    return <Component {...p} ref={innerRef} {...contexts} />;
  };
  const Wrapper = ({innerRef, ...p}) => <Consumer>{render(innerRef, p)}</Consumer>;
  return React.forwardRef((props, ref) => <Wrapper {...props} innerRef={ref} />);
};
