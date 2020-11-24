import React from "react";
import TableHead from "@material-ui/core/TableHead";
import PropTypes from "prop-types";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, data } = this.props;

    return (
      <TableHead>
        <TableRow>
          {data.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? "right" : "left"}
                // padding={row.disablePadding ? "none" : "10"}
                style={{ padding: 10 }}
                sortDirection={orderBy === row.id ? order : false}
              >
                {row.sorting ? (
                  <Tooltip
                    title="Sort"
                    placement={row.numeric ? "bottom-end" : "bottom-start"}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={this.createSortHandler(row.id)}
                    >
                      {row.label}
                    </TableSortLabel>
                  </Tooltip>
                ) : (
                  row.label
                )}
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}
EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  data: PropTypes.array
};

export default EnhancedTableHead;
