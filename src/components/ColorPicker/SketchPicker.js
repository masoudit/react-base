import React from "react";
import PropTypes from "prop-types";
import { SketchPicker } from "react-color";
import withStyles from "@material-ui/core/styles/withStyles";
import Menu from "@material-ui/core/Menu";

const styles = {
  wrapper: {
    position: "relative"
  },
  indicator: {
    display: "inline-block",
    width: "30px",
    height: "22px",
    borderRadius: "5px"
  },
  label: {
    cursor: "pointer"
  },
  picker: {
    direction: "ltr"
  }
};

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      color: props.color || {
        hex: "#7436b3",
        rgb: {
          r: 116,
          g: 54,
          b: 179
        }
      }
    };

    this.changeColor = this.changeColor.bind(this);
  }

  changeColor(color) {
    this.setState({ color: color }, this.props.onChange(color));
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <div
          className={classes.label}
          onClick={event => {
            this.setState({ anchorEl: event.currentTarget });
          }}
        >
          <span>{this.props.title} : </span>
          <span
            className={classes.indicator}
            style={{ background: this.state.color.hex }}
          >
            &nbsp;
          </span>
        </div>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={() => {
            this.setState({ anchorEl: null });
          }}
        >
          <div className={classes.picker}>
            <SketchPicker
              color={this.state.color}
              onChange={this.changeColor}
            />
          </div>
        </Menu>
      </div>
    );
  }
}

ColorPicker.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  onChange: PropTypes.func,
  color: PropTypes.object
};
export default withStyles(styles)(ColorPicker);
