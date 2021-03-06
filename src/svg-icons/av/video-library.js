import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let AvVideoLibrary = (props) => (
  <SvgIcon {...props}>
    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/>
  </SvgIcon>
);
AvVideoLibrary = pure(AvVideoLibrary);
AvVideoLibrary.displayName = 'AvVideoLibrary';
AvVideoLibrary.muiName = 'SvgIcon';

export default AvVideoLibrary;
