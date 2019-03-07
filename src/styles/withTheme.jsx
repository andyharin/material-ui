import React from 'react';
import { Consumer } from './Context';

export Component => props =>
  <Consumer>{contexts => <Component {...props} {...contexts} />}</Consumer>;
