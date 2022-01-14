import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let AvVideoCall = (props) => (
  <SvgIcon {...props}>
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"/>
  </SvgIcon>
);
AvVideoCall = pure(AvVideoCall);
AvVideoCall.displayName = 'AvVideoCall';
AvVideoCall.muiName = 'SvgIcon';

export default AvVideoCall;
