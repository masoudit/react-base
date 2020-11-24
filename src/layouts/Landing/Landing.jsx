/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

const landingStyles = {}

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  componentDidUpdate(e) {

  }
  componentWillUnmount() {

  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <React.Fragment>
      <h1>HI</h1><br />
      <a href='/panel'>Go To Panel</a>
      </React.Fragment>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(landingStyles)(Landing);
