import React from 'react';
import { Consumer } from './Context';

export default Component => props =>
  <Consumer>{contexts => <Component {...props} {...contexts} />}</Consumer>;
