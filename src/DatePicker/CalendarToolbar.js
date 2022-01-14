import { Component } from 'react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';
import IconButton from '../IconButton';
import NavigationChevronLeft from '../svg-icons/navigation/chevron-left';
import NavigationChevronRight from '../svg-icons/navigation/chevron-right';
import SlideInTransitionGroup from '../internal/SlideIn';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'inherit',
    height: 48,
  },
  titleDiv: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    width: '100%',
  },
  titleText: {
    height: 'inherit',
    paddingTop: 12,
  },
};

class CalendarToolbar extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func.isRequired,
    displayDate: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    nextMonth: PropTypes.bool,
    onMonthChange: PropTypes.func,
    prevMonth: PropTypes.bool,
  };

  static defaultProps = {
    nextMonth: true,
    prevMonth: true,
  };

  state = {
    transitionDirection: 'up',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.displayDate !== this.props.displayDate) {
      const nextDirection = this.props.muiTheme.isRtl ? 'right' : 'left';
      const prevDirection = this.props.muiTheme.isRtl ? 'left' : 'right';
      const direction = nextProps.displayDate > this.props.displayDate ? nextDirection : prevDirection;
      this.setState({
        transitionDirection: direction,
      });
    }
  }

  handleClickPrevMonth = () => {
    if (this.props.onMonthChange) {
      this.props.onMonthChange(-1);
    }
  };

  handleClickNextMonth = () => {
    if (this.props.onMonthChange) {
      this.props.onMonthChange(1);
    }
  };

  render() {
    const {DateTimeFormat, locale, displayDate} = this.props;

    const dateTimeFormatted = new DateTimeFormat(locale, {
      month: 'long',
      year: 'numeric',
    }).format(displayDate);

    const nextButtonIcon = this.props.muiTheme.isRtl ? <NavigationChevronLeft /> : <NavigationChevronRight />;
    const prevButtonIcon = this.props.muiTheme.isRtl ? <NavigationChevronRight /> : <NavigationChevronLeft />;


    return (
      <div css={styles.root}>
        <IconButton
          disabled={!this.props.prevMonth}
          onClick={this.handleClickPrevMonth}
        >
          {prevButtonIcon}
        </IconButton>
        <SlideInTransitionGroup
          direction={this.state.transitionDirection}
          css={styles.titleDiv}
        >
          <div key={dateTimeFormatted} css={styles.titleText}>
            {dateTimeFormatted}
          </div>
        </SlideInTransitionGroup>
        <IconButton
          disabled={!this.props.nextMonth}
          onClick={this.handleClickNextMonth}
        >
          {nextButtonIcon}
        </IconButton>
      </div>
    );
  }
}

export default withTheme(CalendarToolbar);
