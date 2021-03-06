import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let DeviceSignalCellular0Bar = (props) => (
  <SvgIcon {...props}>
    <path fillOpacity=".3" d="M2 22h20V2z"/>
  </SvgIcon>
);
DeviceSignalCellular0Bar = pure(DeviceSignalCellular0Bar);
DeviceSignalCellular0Bar.displayName = 'DeviceSignalCellular0Bar';
DeviceSignalCellular0Bar.muiName = 'SvgIcon';

export default DeviceSignalCellular0Bar;
