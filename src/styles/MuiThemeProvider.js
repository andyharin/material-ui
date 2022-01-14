import { Provider } from './Context';

const MuiThemeProvider = ({ muiTheme, children }) =>
  <Provider value={{ muiTheme }}>{children}</Provider>;

export default MuiThemeProvider;
