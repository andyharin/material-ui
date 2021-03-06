import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ImageNavigateBefore = (props) => (
  <SvgIcon {...props}>
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
  </SvgIcon>
);
ImageNavigateBefore = pure(ImageNavigateBefore);
ImageNavigateBefore.displayName = 'ImageNavigateBefore';
ImageNavigateBefore.muiName = 'SvgIcon';

export default ImageNavigateBefore;
