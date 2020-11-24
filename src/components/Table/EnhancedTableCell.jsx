import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";

// import EditIcon from "@material-ui/icons/Edit";
// import VisibilityIcon from "@material-ui/icons/Visibility";
// import AllInbox from "@material-ui/icons/AllInbox";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import PlayArrowIcon from "@material-ui/icons/PlayCircleOutline";
import PauseIcon from "@material-ui/icons/PauseCircleOutline";
import NumberFormat from "react-number-format";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
// import DeleteIcon from "@material-ui/icons/Delete";
import Icon from "@material-ui/core/Icon";

const cellStyle = {
  show: {
    display: "inline-flex"
  },
  no_show: {
    display: "none"
  },
  cell: {
    "&:hover": {
      cursor: "pointer"
    }
  }
};
class EnhancedTableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.cid = this.props.rowId + "_" + this.props.cellId;
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.enableEdit = this.enableEdit.bind(this);
    this.saveChange = this.saveChange.bind(this);
  }

  componentDidMount() {
    if (this.props.cell.type === "price" || this.props.cell.type === "select") {
      this.setState({
        ["editableField_" + this.cid]: this.props.cell.name,
        ["field_" + this.cid]: true
      });
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  enableEdit = name => {
    this.setState({ [name]: false });
    this.setState({
      ["showSave_" + this.cid]: true
    });
  };

  saveChange = () => {
    this.props.updateCell({
      rowId: this.props.rowId,
      fieldType: this.props.cell.id,
      fieldValue: this.state["editableField_" + this.cid]
    });
    this.setState({
      ["field_" + this.cid]: true,
      ["showSave_" + this.cid]: false
    });
  };

  numberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value
            }
          });
        }}
        thousandSeparator
        prefix="ً"
      />
    );
  }

  handleChangeSelect = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.updateCell({
      rowId: this.props.rowId,
      fieldType: this.props.cell.id,
      fieldValue: event.target.value
    });
  };

  render() {
    const {
      id,
      name,
      type,
      // icon,
      // link,
      editable,
      innerCells,
      defaultSelectList,
      disable
    } = this.props.cell;
    const { classes } = this.props;

    return (
      <TableCell key={id} align="right" style={{ padding: 10 }}>
        {innerCells && innerCells.length > 0 ? (
          innerCells.map((inCell, index) => {
            return (
              <span key={index} align="right" className={classes.cell}>
                {inCell.id === "edit" ? (
                  <span
                    onClick={() => {
                      this.props.prop.history.push(inCell.link);
                    }}
                    title={inCell.name}
                  >
                    <Icon>{inCell.icon}</Icon>
                  </span>
                ) : inCell.id === "delete" ? (
                  <span
                    onClick={() => {
                      this.props.prop.showAlert({
                        title: "هشدار",
                        text: `آیا تمایل به حذف ${name} دارید؟`,
                        handleClose: agreed => {
                          if (agreed) {
                            // this.props.prop.deleteCampaign(this.props.rowId);
                            this.props.updateCell({
                              id: this.props.rowId,
                              type: "delete"
                            });
                          }
                        }
                      });
                    }}
                  >
                    <Icon>{inCell.icon}</Icon>
                  </span>
                ) : inCell.id === "play" ? (
                  <span
                    onClick={() => {
                      // this.props.prop.pauseCampaign(this.props.rowId);
                      this.props.updateCell({
                        id: this.props.rowId,
                        type: "pause"
                      });
                    }}
                  >
                    <PauseIcon style={{ color: "black" }} />
                  </span>
                ) : inCell.id === "pause" ? (
                  <span
                    onClick={() => {
                      // this.props.prop.startCampaign(this.props.rowId);
                      this.props.updateCell({
                        id: this.props.rowId,
                        type: "play"
                      });
                    }}
                  >
                    <PlayArrowIcon style={{ color: "green" }} />
                  </span>
                ) : (
                  ""
                )}
              </span>
            );
          })
        ) : type === false ? (
          name ? (
            name
          ) : (
            "--"
          )
        ) : type === "price" ? (
          editable ? (
            <div style={{ width: 110 }}>
              <Tooltip title={!disable ? "جهت تغییر دوبار کلیک کنید!" : ""}>
                <TextField
                  autoComplete={"off"}
                  disabled={disable}
                  InputProps={{
                    readOnly: this.state["field_" + this.cid],
                    inputComponent: this.numberFormatCustom
                  }}
                  style={{ width: 85 }}
                  value={!disable ? this.state["editableField_" + this.cid] : 0}
                  onChange={this.handleChange("editableField_" + this.cid)}
                  onDoubleClick={() =>
                    !disable && this.enableEdit("field_" + this.cid)
                  }
                  margin="normal"
                />
              </Tooltip>
              ریال
            </div>
          ) : (
            <NumberFormat
              width={200}
              value={name}
              displayType={"text"}
              thousandSeparator={true}
              suffix=" ریال "
            />
          )
        ) : type === "select" ? (
          <FormControl>
            <Select
              style={{ width: 120 }}
              value={
                this.state["editableField_" + this.cid]
                  ? this.state["editableField_" + this.cid]
                  : ""
              }
              name={"editableField_" + this.cid}
              onChange={this.handleChangeSelect}
            >
              {defaultSelectList.map((item, did) => {
                return (
                  <MenuItem value={item.key} key={did}>
                    {item.value}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        ) : (
          ""
        )}
        <div
          className={
            this.state["showSave_" + this.cid]
              ? this.props.classes.show
              : this.props.classes.no_show
          }
        >
          <SaveIcon
            color="primary"
            onClick={() => {
              this.props.prop.showAlert({
                title: "پیام",
                text: `آیا جهت تغییر مطمئن هستید؟`,
                handleClose: agreed => {
                  if (agreed) {
                    this.saveChange();
                  }
                }
              });
            }}
          />
          <CancelIcon
            color="error"
            onClick={() => {
              this.setState({
                ["showSave_" + this.cid]: false,
                ["editableField_" + this.cid]: name
              });
            }}
          />
        </div>
      </TableCell>
    );
  }
}
EnhancedTableCell.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(cellStyle)(EnhancedTableCell);
