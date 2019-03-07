import React from 'react';
import getMuiTheme from './getMuiTheme';
import { Provider } from './Context';

const MuiThemeProvider = ({ muiTheme, children }) =>
  <Provider value={{ muiTheme: muiTheme || getMuiTheme() }}>{children}</Provider>;

export default MuiThemeProvider;
