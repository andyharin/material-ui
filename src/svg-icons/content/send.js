import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ContentSend = (props) => (
  <SvgIcon {...props}>
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </SvgIcon>
);
ContentSend = pure(ContentSend);
ContentSend.displayName = 'ContentSend';
ContentSend.muiName = 'SvgIcon';

export default ContentSend;
