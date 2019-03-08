import React from 'react';

const StepperContext = React.createContext({});

const Provider = StepperContext.Provider;
const Consumer = StepperContext.Consumer;


export const withContext = Component => props =>
  <Consumer>{contexts => <Component {...props} {...contexts} />}</Consumer>;

export default StepperContext;
export { Provider, Consumer };
