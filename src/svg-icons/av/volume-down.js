import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let AvVolumeDown = (props) => (
  <SvgIcon {...props}>
    <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
  </SvgIcon>
);
AvVolumeDown = pure(AvVolumeDown);
AvVolumeDown.displayName = 'AvVolumeDown';
AvVolumeDown.muiName = 'SvgIcon';

export default AvVolumeDown;
