import { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from '../FlatButton';

class CalendarActionButton extends Component {
  static propTypes = {
    autoOk: PropTypes.bool,
    cancelLabel: PropTypes.node,
    okLabel: PropTypes.node,
    onClickCancel: PropTypes.func,
    onClickOk: PropTypes.func,
  };

  render() {
    const {cancelLabel, okLabel} = this.props;

    const styles = {
      root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 0,
        maxHeight: 48,
        padding: 0,
      },
      flatButtons: {
        fontsize: 14,
        margin: '4px 8px 8px 0px',
        maxHeight: 36,
        minWidth: 64,
        padding: 0,
      },
    };

    return (
      <div style={styles.root} >
        <FlatButton
          label={cancelLabel}
          onClick={this.props.onClickCancel}
          primary={true}
          style={styles.flatButtons}
        />
        {!this.props.autoOk &&
          <FlatButton
            disabled={this.refs.calendar !== undefined && this.refs.calendar.isSelectedDateDisabled()}
            label={okLabel}
            onClick={this.props.onClickOk}
            primary={true}
            style={styles.flatButtons}
          />
        }
      </div>
    );
  }
}

export default CalendarActionButton;
