import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ContentFilterList = (props) => (
  <SvgIcon {...props}>
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
  </SvgIcon>
);
ContentFilterList = pure(ContentFilterList);
ContentFilterList.displayName = 'ContentFilterList';
ContentFilterList.muiName = 'SvgIcon';

export default ContentFilterList;
