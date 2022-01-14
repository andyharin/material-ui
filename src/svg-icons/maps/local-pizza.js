import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let MapsLocalPizza = (props) => (
  <SvgIcon {...props}>
    <path d="M12 2C8.43 2 5.23 3.54 3.01 6L12 22l8.99-16C18.78 3.55 15.57 2 12 2zM7 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
  </SvgIcon>
);
MapsLocalPizza = pure(MapsLocalPizza);
MapsLocalPizza.displayName = 'MapsLocalPizza';
MapsLocalPizza.muiName = 'SvgIcon';

export default MapsLocalPizza;
