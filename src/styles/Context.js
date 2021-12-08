import { createContext } from 'react';
import getMuiTheme from './getMuiTheme';

const ThemeContext = createContext({ muiTheme: getMuiTheme() });

const Provider = ThemeContext.Provider;
const Consumer = ThemeContext.Consumer;

export default ThemeContext;
export { Provider, Consumer };
