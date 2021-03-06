import { Children, isValidElement, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import withTheme from '../styles/withTheme';
import Checkbox from '../Checkbox';
import TableRowColumn from './TableRowColumn';
import ClickAwayListener from '../internal/ClickAwayListener';

class TableBody extends Component {
  static muiName = 'TableBody';

  static propTypes = {
    /**
     * @ignore
     * Set to true to indicate that all rows should be selected.
     */
    allRowsSelected: PropTypes.bool,
    /**
     * Children passed to table body.
     */
    children: PropTypes.node,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    /**
     * Controls whether or not to deselect all selected
     * rows after clicking outside the table.
     */
    deselectOnClickaway: PropTypes.bool,
    /**
     * Controls the display of the row checkbox. The default value is true.
     */
    displayRowCheckbox: PropTypes.bool,
    /**
     * @ignore
     * If true, multiple table rows can be selected.
     * CTRL/CMD+Click and SHIFT+Click are valid actions.
     * The default value is false.
     */
    multiSelectable: PropTypes.bool,
    /**
     * @ignore
     * Callback function for when a cell is clicked.
     */
    onCellClick: PropTypes.func,
    /**
     * @ignore
     * Called when a table cell is hovered. rowNumber
     * is the row number of the hovered row and columnId
     * is the column number or the column key of the cell.
     */
    onCellHover: PropTypes.func,
    /**
     * @ignore
     * Called when a table cell is no longer hovered.
     * rowNumber is the row number of the row and columnId
     * is the column number or the column key of the cell.
     */
    onCellHoverExit: PropTypes.func,
    /**
     * @ignore
     * Called when a table row is hovered.
     * rowNumber is the row number of the hovered row.
     */
    onRowHover: PropTypes.func,
    /**
     * @ignore
     * Called when a table row is no longer
     * hovered. rowNumber is the row number of the row
     * that is no longer hovered.
     */
    onRowHoverExit: PropTypes.func,
    /**
     * @ignore
     * Called when a row is selected. selectedRows is an
     * array of all row selections. If all rows have been selected,
     * the string "all" will be returned instead to indicate that
     * all rows have been selected.
     */
    onRowSelection: PropTypes.func,
    /**
     * Controls whether or not the rows are pre-scanned to determine
     * initial state. If your table has a large number of rows and
     * you are experiencing a delay in rendering, turn off this property.
     */
    preScanRows: PropTypes.bool,
    /**
     * @ignore
     * If true, table rows can be selected. If multiple
     * row selection is desired, enable multiSelectable.
     * The default value is true.
     */
    selectable: PropTypes.bool,
    /**
     * If true, table rows will be highlighted when
     * the cursor is hovering over the row. The default
     * value is false.
     */
    showRowHover: PropTypes.bool,
    /**
     * If true, every other table row starting
     * with the first row will be striped. The default value is false.
     */
    stripedRows: PropTypes.bool,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static defaultProps = {
    allRowsSelected: false,
    deselectOnClickaway: true,
    displayRowCheckbox: true,
    multiSelectable: false,
    preScanRows: true,
    selectable: true,
    style: {},
  };

  state = {
    selectedRows: [],
  };

  componentWillMount() {
    if (this.props.preScanRows) {
      this.setState({
        selectedRows: this.getSelectedRows(this.props),
      });
    }
  }

  componentDidMount() {
    if (!this.props.preScanRows) {
      this.setState({ // eslint-disable-line react/no-did-mount-set-state
        selectedRows: this.getSelectedRows(this.props),
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.allRowsSelected !== nextProps.allRowsSelected) {
      if (!nextProps.allRowsSelected) {
        this.setState({
          selectedRows: [],
        });
        return;
      }
    }

    this.setState({
      selectedRows: this.getSelectedRows(nextProps),
    });
  }

  isControlled = false

  handleClickAway = () => {
    if (this.props.deselectOnClickaway && this.state.selectedRows.length > 0) {
      const selectedRows = [];
      this.setState({selectedRows});
      if (this.props.onRowSelection) {
        this.props.onRowSelection(selectedRows);
      }
    }
  };

  createRows() {
    const numChildren = Children.count(this.props.children);
    let rowNumber = 0;
    const handlers = {
      onCellClick: this.onCellClick,
      onCellHover: this.onCellHover,
      onCellHoverExit: this.onCellHoverExit,
      onRowHover: this.onRowHover,
      onRowHoverExit: this.onRowHoverExit,
      onRowClick: this.onRowClick,
    };

    return Children.map(this.props.children, (child) => {
      if (isValidElement(child)) {
        const props = {
          hoverable: this.props.showRowHover,
          selected: this.isRowSelected(rowNumber),
          striped: this.props.stripedRows && (rowNumber % 2 === 0),
          rowNumber: rowNumber++,
        };

        if (rowNumber === numChildren) {
          props.displayBorder = false;
        }

        const children = [
          this.createRowCheckboxColumn(props),
        ];

        Children.forEach(child.props.children, (child) => {
          children.push(child);
        });

        return cloneElement(child, {...props, ...handlers}, children);
      }
    });
  }

  createRowCheckboxColumn(rowProps) {
    if (!this.props.displayRowCheckbox) {
      return null;
    }

    const name = `${rowProps.rowNumber}-cb`;
    const disabled = !this.props.selectable;

    return (
      <TableRowColumn
        key={name}
        columnNumber={0}
        style={{
          width: 24,
          cursor: disabled ? 'default' : 'inherit',
        }}
      >
        <Checkbox
          name={name}
          value="selected"
          disabled={disabled}
          checked={rowProps.selected}
        />
      </TableRowColumn>
    );
  }

  getSelectedRows(props) {
    const selectedRows = [];

    if (props.selectable) {
      let index = 0;
      Children.forEach(props.children, (child) => {
        if (isValidElement(child)) {
          if (child.props.selected !== undefined) {
            this.isControlled = true;
          }

          if (child.props.selected && (selectedRows.length === 0 || props.multiSelectable)) {
            selectedRows.push(index);
          }

          index++;
        }
      });
    }

    return selectedRows;
  }

  isRowSelected(rowNumber) {
    if (this.props.allRowsSelected) {
      return true;
    }

    return this.state.selectedRows.some((row) => {
      if (typeof row === 'object') {
        if (this.isValueInRange(rowNumber, row)) {
          return true;
        }
      } else {
        if (row === rowNumber) {
          return true;
        }
      }

      return false;
    });
  }

  isValueInRange(value, range) {
    if (!range) return false;

    if ((range.start <= value && value <= range.end) || (range.end <= value && value <= range.start)) {
      return true;
    }

    return false;
  }

  onRowClick = (event, rowNumber) => {
    event.stopPropagation();

    if (this.props.selectable) {
      // Prevent text selection while selecting rows.
      if (window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects.length > 0) {
        window.getSelection().removeAllRanges();
      }
      this.processRowSelection(event, rowNumber);
    }
  };

  processRowSelection(event, rowNumber) {
    let selectedRows = [...this.state.selectedRows];

    if (event.shiftKey && this.props.multiSelectable && selectedRows.length > 0) {
      const lastIndex = selectedRows.length - 1;
      const lastSelection = selectedRows[lastIndex];

      if (typeof lastSelection === 'object') {
        lastSelection.end = rowNumber;
      } else {
        selectedRows.splice(lastIndex, 1, {
          start: lastSelection,
          end: rowNumber,
        });
      }
    } else if (((event.ctrlKey && !event.metaKey) || (event.metaKey && !event.ctrlKey)) && this.props.multiSelectable) {
      const idx = selectedRows.indexOf(rowNumber);
      if (idx < 0) {
        let foundRange = false;
        for (let i = 0; i < selectedRows.length; i++) {
          const range = selectedRows[i];
          if (typeof range !== 'object') continue;

          if (this.isValueInRange(rowNumber, range)) {
            foundRange = true;
            const values = this.splitRange(range, rowNumber);
            selectedRows.splice(i, 1, ...values);
          }
        }

        if (!foundRange) selectedRows.push(rowNumber);
      } else {
        selectedRows.splice(idx, 1);
      }
    } else {
      if (selectedRows.length === 1 && selectedRows[0] === rowNumber) {
        selectedRows = [];
      } else {
        selectedRows = [rowNumber];
      }
    }

    if (!this.isControlled) {
      this.setState({selectedRows});
    }

    if (this.props.onRowSelection) {
      this.props.onRowSelection(this.flattenRanges(selectedRows));
    }
  }

  splitRange(range, splitPoint) {
    const splitValues = [];
    const startOffset = range.start - splitPoint;
    const endOffset = range.end - splitPoint;

    // Process start half
    splitValues.push(...this.genRangeOfValues(splitPoint, startOffset));

    // Process end half
    splitValues.push(...this.genRangeOfValues(splitPoint, endOffset));

    return splitValues;
  }

  genRangeOfValues(start, offset) {
    const values = [];
    const dir = (offset > 0) ? -1 : 1; // This forces offset to approach 0 from either direction.
    while (offset !== 0) {
      values.push(start + offset);
      offset += dir;
    }

    return values;
  }

  flattenRanges(selectedRows) {
    return selectedRows
      .reduce((rows, row) => {
        if (typeof row === 'object') {
          const values = this.genRangeOfValues(row.end, row.start - row.end);
          rows.push(row.end, ...values);
        } else {
          rows.push(row);
        }

        return rows;
      }, [])
      .sort();
  }

  onCellClick = (event, rowNumber, columnNumber) => {
    event.stopPropagation();
    if (this.props.onCellClick) {
      this.props.onCellClick(rowNumber, this.getColumnId(columnNumber), event);
    }
  };

  onCellHover = (event, rowNumber, columnNumber) => {
    if (this.props.onCellHover) {
      this.props.onCellHover(rowNumber, this.getColumnId(columnNumber), event);
    }
    this.onRowHover(event, rowNumber);
  };

  onCellHoverExit = (event, rowNumber, columnNumber) => {
    if (this.props.onCellHoverExit) {
      this.props.onCellHoverExit(rowNumber, this.getColumnId(columnNumber), event);
    }
    this.onRowHoverExit(event, rowNumber);
  };

  onRowHover = (event, rowNumber) => {
    if (this.props.onRowHover) {
      this.props.onRowHover(rowNumber);
    }
  };

  onRowHoverExit = (event, rowNumber) => {
    if (this.props.onRowHoverExit) {
      this.props.onRowHoverExit(rowNumber);
    }
  };

  getColumnId(columnNumber) {
    return columnNumber - 1;
  }

  render() {
    const {
      style,
      allRowsSelected, // eslint-disable-line no-unused-vars
      multiSelectable, // eslint-disable-line no-unused-vars
      onCellClick, // eslint-disable-line no-unused-vars
      onCellHover, // eslint-disable-line no-unused-vars
      onCellHoverExit, // eslint-disable-line no-unused-vars
      onRowHover, // eslint-disable-line no-unused-vars
      onRowHoverExit, // eslint-disable-line no-unused-vars
      onRowSelection, // eslint-disable-line no-unused-vars
      selectable, // eslint-disable-line no-unused-vars
      deselectOnClickaway, // eslint-disable-line no-unused-vars
      showRowHover, // eslint-disable-line no-unused-vars
      stripedRows, // eslint-disable-line no-unused-vars
      displayRowCheckbox, // eslint-disable-line no-unused-vars
      preScanRows, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;


    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <View {...other} style={style}>{this.createRows()}</View>
      </ClickAwayListener>
    );
  }
}

const ViewComponent = ({muiTheme, children, style, ...other}) => {
  const {prepareStyles} = muiTheme;
  return (
    <tbody css={prepareStyles(Object.assign({}, style))} {...other}>
      {children}
    </tbody>
  );
};
const View = withTheme(ViewComponent);

export default TableBody;
