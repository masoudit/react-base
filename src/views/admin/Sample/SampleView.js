import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Grid from "@material-ui/core/Grid";
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "IRANSans, sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class SampleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false
    };
  }

  render() {
    const { classes, content } = this.props;
    return (
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>صفحه نمونه</h4>
          <p className={classes.cardCategoryWhite}>صفحه الگو برای بخش مدیریت</p>
        </CardHeader>
        <CardBody>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={8}>
              <h2>ستون ۱</h2>
              <p>{content}</p>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <h2>ستون ۱</h2>
            </Grid>
          </Grid>
        </CardBody>
      </Card>
    );
  }
}

SampleView.propTypes = {
  classes: PropTypes.object,
  content: PropTypes.string
};

export default withStyles(styles)(SampleView);
