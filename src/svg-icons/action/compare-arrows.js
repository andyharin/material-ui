import pure from 'recompose/pure';
import SvgIcon from '../../SvgIcon';

let ActionCompareArrows = (props) => (
  <SvgIcon {...props}>
    <path d="M9.01 14H2v2h7.01v3L13 15l-3.99-4v3zm5.98-1v-3H22V8h-7.01V5L11 9l3.99 4z"/>
  </SvgIcon>
);
ActionCompareArrows = pure(ActionCompareArrows);
ActionCompareArrows.displayName = 'ActionCompareArrows';
ActionCompareArrows.muiName = 'SvgIcon';

export default ActionCompareArrows;
