import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ImageCrop32 = (props) => (
  <SvgIcon {...props}>
    <path d="M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V6h14v12z"/>
  </SvgIcon>
);
ImageCrop32 = pure(ImageCrop32);
ImageCrop32.displayName = 'ImageCrop32';
ImageCrop32.muiName = 'SvgIcon';

export default ImageCrop32;
