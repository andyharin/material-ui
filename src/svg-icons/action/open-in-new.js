import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ActionOpenInNew = (props) => (
  <SvgIcon {...props}>
    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
  </SvgIcon>
);
ActionOpenInNew = pure(ActionOpenInNew);
ActionOpenInNew.displayName = 'ActionOpenInNew';
ActionOpenInNew.muiName = 'SvgIcon';

export default ActionOpenInNew;
