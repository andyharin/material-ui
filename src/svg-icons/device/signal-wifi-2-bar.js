import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let DeviceSignalWifi2Bar = (props) => (
  <SvgIcon {...props}>
    <path fillOpacity=".3" d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"/><path d="M4.79 12.52l7.2 8.98H12l.01-.01 7.2-8.98C18.85 12.24 16.1 10 12 10s-6.85 2.24-7.21 2.52z"/>
  </SvgIcon>
);
DeviceSignalWifi2Bar = pure(DeviceSignalWifi2Bar);
DeviceSignalWifi2Bar.displayName = 'DeviceSignalWifi2Bar';
DeviceSignalWifi2Bar.muiName = 'SvgIcon';

export default DeviceSignalWifi2Bar;
