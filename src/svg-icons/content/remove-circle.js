import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ContentRemoveCircle = (props) => (
  <SvgIcon {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/>
  </SvgIcon>
);
ContentRemoveCircle = pure(ContentRemoveCircle);
ContentRemoveCircle.displayName = 'ContentRemoveCircle';
ContentRemoveCircle.muiName = 'SvgIcon';

export default ContentRemoveCircle;
