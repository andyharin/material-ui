import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import Context from './Context';
import isReact from 'is-react';

export default Component => {
  const WrappedComponent = React.forwardRef(function Component(_props, ref) {
    const {muiTheme} = React.useContext(Context);
    const props = {..._props};

    if (isReact.classComponent(Component)) {
      props.ref = ref;
    }

    return <Component {...props} muiTheme={muiTheme} />;
  });

  return hoistNonReactStatics(WrappedComponent, Component);
};
