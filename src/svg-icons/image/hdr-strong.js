import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ImageHdrStrong = (props) => (
  <SvgIcon {...props}>
    <path d="M17 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zM5 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
  </SvgIcon>
);
ImageHdrStrong = pure(ImageHdrStrong);
ImageHdrStrong.displayName = 'ImageHdrStrong';
ImageHdrStrong.muiName = 'SvgIcon';

export default ImageHdrStrong;
