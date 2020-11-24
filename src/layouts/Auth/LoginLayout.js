import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// import AddAlert from "@material-ui/icons/AddAlert";

// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
// import Snackbar from "components/Snackbar/Snackbar.jsx";

import loginRoutes from "routes/login.js";
import logo from "assets/img/advest-alt.svg";

const styles = {
  background: {
    minHeight: "100vh",
    background: "linear-gradient(64deg, #7436b3, #7436b3 64%, #36b3b3);"
  },
  logo: {
    maxWidth: "240px",
    display: "block",
    margin: "auto"
  }
};

class LoginLayout extends React.Component {
  constructor(props) {
    super(props);
    this.showInternalError = this.showInternalError.bind(this);
  }

  showInternalError(message, variant) {
    this.props.enqueueSnackbar(message || "خطایی پیش آمد", {
      variant: variant || "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center"
      }
    });
  }

  componentDidUpdate() {
    if (this.props.error) {
      this.props.enqueueSnackbar(
        this.props.errorMessage || "در برقراری ارتباط خطایی پیش آمد",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center"
          }
        }
      );
      this.props.removeErrors();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {!this.props.token ? (
          <Grid container className={classes.background}>
            <Grid item xs={12}>
              <Grid container justify="center">
                <Grid item xs={11} md={4}>
                  <Card>
                    <CardHeader
                      color="primary"
                      style={{ background: "#7436b3" }}
                    >
                      <img
                        className={classes.logo}
                        src={logo}
                        alt="ادوست تبلیغات سرمایه گذاری"
                      />
                    </CardHeader>
                    <Switch>
                      {loginRoutes.map((prop, key) => {
                        if (prop.redirect)
                          return (
                            <Redirect from="/auth" to="/auth/login" key={key} />
                          );
                        const { classes, ...otherProps } = this.props;
                        return (
                          <Route
                            path={this.props.match.url + prop.path}
                            key={key}
                            render={properties => (
                              <prop.component
                                listenToAPIMessages={this.listenToAPIMessages}
                                showInternalError={this.showInternalError}
                                pc={classes}
                                {...otherProps}
                                {...properties}
                              />
                            )}
                          />
                        );
                      })}
                    </Switch>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Redirect
            to={{
              pathname:
                (this.props.location.state &&
                  this.props.location.state.referrer) ||
                "/"
            }}
          />
        )}
      </React.Fragment>
    );
  }
}

LoginLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object,
  token: PropTypes.string
};

export default withStyles(styles)(LoginLayout);
