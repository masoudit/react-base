import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableCell from "./EnhancedTableCell";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import { get } from "lodash";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp, page, rowsPerPage, serverSide) {
  if (!serverSide) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis
      .map(el => el[0])
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  } else {
    return array;
  }
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },
  icon_red: {
    color: "red"
  },
  icon_edit: {
    color: "gray"
  }
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: this.props.order,
      orderBy: this.props.orderBy,
      selected: [],
      data: [],
      page: this.props.defaultPage,
      rowsPerPage: this.props.defaultrowsPerPage
    };
  }

  componentDidMount() {
    this.setState({
      data: this.props.bodyData
    });
  }

  componentDidUpdate(prevProps) {
    // eslint-disable-next-line
    if (prevProps.bodyData != this.props.bodyData) {
      this.setState({
        data: this.props.bodyData
      });
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";
    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }
    let params = {
      orderBy: orderBy
    };
    if (this.props.serverSide) {
      this.props.updateParentState(params);
    }
    this.setState({ order, orderBy });
  };

  // Pagination Function
  handleChangePage = (event, page) => {
    let params = {
      page: page + 1
    };
    if (this.props.serverSide) {
      this.props.updateParentState(params);
    }
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    let params = {
      rowsPerPage: event.target.value
    };
    if (this.props.serverSide) {
      this.props.updateParentState(params);
    }
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChangeFilter = (event, filterType) => {
    let params = {
      filters: {
        selected: event,
        type: filterType
      }
    };
    this.props.updateParentState(params);
  };

  render() {
    const {
      classes,
      toolbar,
      filters,
      pagination,
      serverSide,
      tableTitle,
      headData,
      totalPages,
      prop,
      updateCell
    } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, totalPages - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        {toolbar ? (
          <EnhancedTableToolbar
            handleChangeFilter={this.handleChangeFilter}
            filters={filters}
            tableTitle={tableTitle}
          />
        ) : (
          ""
        )}
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              data={headData}
            />
            <TableBody>
              {stableSort(
                data,
                getSorting(order, orderBy),
                page,
                rowsPerPage,
                serverSide
              ).map((rows, index) => {
                return (
                  <TableRow hover tabIndex={-1} key={index}>
                    {get(rows, "rows", []).map((cell, indexCell) => {
                      return (
                        <EnhancedTableCell
                          key={indexCell}
                          rowId={rows.id}
                          cellId={index}
                          cell={cell}
                          prop={prop}
                          updateCell={updateCell}
                        />
                      );
                    })}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {pagination ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={totalPages}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        ) : (
          ""
        )}
      </Paper>
    );
  }
}
EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  updateCell: PropTypes.func,
  updateParentState: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  bodyData: PropTypes.array,
  prop: PropTypes.object,
  toolbar: PropTypes.bool,
  filters: PropTypes.array,
  pagination: PropTypes.bool,
  serverSide: PropTypes.bool,
  tableTitle: PropTypes.string,
  headData: PropTypes.array || PropTypes.object,
  defaultPage: PropTypes.number,
  defaultrowsPerPage: PropTypes.number,
  totalPages: PropTypes.number
};
export default withStyles(styles)(EnhancedTable);
