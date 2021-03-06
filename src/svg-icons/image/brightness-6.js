import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ImageBrightness6 = (props) => (
  <SvgIcon {...props}>
    <path d="M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18V6c3.31 0 6 2.69 6 6s-2.69 6-6 6z"/>
  </SvgIcon>
);
ImageBrightness6 = pure(ImageBrightness6);
ImageBrightness6.displayName = 'ImageBrightness6';
ImageBrightness6.muiName = 'SvgIcon';

export default ImageBrightness6;
