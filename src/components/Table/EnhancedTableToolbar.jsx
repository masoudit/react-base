import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FilterListIcon from "@material-ui/icons/FilterList";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

class EnhancedTableToolbar extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleChangeSelect = (event, filter) => {
    // change filter
    this.props.handleChangeFilter(event.target.value, filter);
    this.setState({
      [filter]: event.target.value
    });
  };

  generateMenuItems = filters => {
    // var menuItems = "";
    return Object.keys(filters).map((filter, key) => {
      let row = filters[filter];
      return (
        <Grid item xs={row.width} key={key}>
          <MenuItem onClick={this.handleClose} className={"menu" + key}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel htmlFor={"input" + row.name}>{row.name}</InputLabel>
              <Select
                native
                value={this.state[filter]}
                inputProps={{
                  name: row.name,
                  id: "input" + row.name
                }}
                onChange={e => this.handleChangeSelect(e, filter)}
              >
                {row.data.map((item, i) => (
                  <option key={i} value={item.key}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </MenuItem>
        </Grid>
      );
    });
  };

  render() {
    const { anchorEl } = this.state;
    const { filters } = this.props;
    return (
      <div>
        <FilterListIcon onClick={this.handleClick} />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <Grid container spacing={24} style={{ margin: -6 }}>
            {this.generateMenuItems(filters)}
          </Grid>
        </Menu>
      </div>
    );
  }
}

export default EnhancedTableToolbar;
