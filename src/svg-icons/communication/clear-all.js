import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let CommunicationClearAll = (props) => (
  <SvgIcon {...props}>
    <path d="M5 13h14v-2H5v2zm-2 4h14v-2H3v2zM7 7v2h14V7H7z"/>
  </SvgIcon>
);
CommunicationClearAll = pure(CommunicationClearAll);
CommunicationClearAll.displayName = 'CommunicationClearAll';
CommunicationClearAll.muiName = 'SvgIcon';

export default CommunicationClearAll;
