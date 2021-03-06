import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let EditorFormatIndentDecrease = (props) => (
  <SvgIcon {...props}>
    <path d="M11 17h10v-2H11v2zm-8-5l4 4V8l-4 4zm0 9h18v-2H3v2zM3 3v2h18V3H3zm8 6h10V7H11v2zm0 4h10v-2H11v2z"/>
  </SvgIcon>
);
EditorFormatIndentDecrease = pure(EditorFormatIndentDecrease);
EditorFormatIndentDecrease.displayName = 'EditorFormatIndentDecrease';
EditorFormatIndentDecrease.muiName = 'SvgIcon';

export default EditorFormatIndentDecrease;
