import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";

import GoogleLoginBtn from "./components/GoogleLoginBtn";

const styles = {
  logo: {
    maxWidth: "240px",
    display: "block",
    margin: "auto"
  },
  slogan: {
    textAlign: "center"
  },
  loginBtn: {
    width: "100%",
    marginTop: "10px"
  },
  forgotBtn: {
    alignSelf: "last baseline",
    marginLeft: "-10",
    marginTop: "10px"
  },
  googleBtn: {
    marginTop: "10px",
    marginBottom: "10px",
    background: "transparent",
    width: "100%"
  },
  noneBtn: {
    border: "none",
    background: "transparent",
    margin: 0,
    padding: 0
  }
};

class Forgot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      responseProcessed: false
    };
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    this.setState({
      responseProcessed: false
    });
    this.props.forgotPass({
      username: this.state.userName
    });
  }

  componentDidUpdate() {
    if (this.props.auth && !this.state.responseProcessed) {
      if (this.props.auth.resetType === "MOBILE") {
        this.props.history.push("/auth/reset/sms");
      } else {
        this.props.showInternalError(
          this.props.auth.message ||
            "دستورالعمل بازیابی رمزعبور برای شما ارسال شده است",
          "info"
        );
      }
      this.setState({
        responseProcessed: true
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.submitForm}>
        <CardBody>
          <div className={classes.slogan}>بازیابی رمزعبور</div>
          <Grid container>
            <Grid item xs={12}>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="userName"
                    label="نام کاربری"
                    required
                    fullWidth
                    value={this.state.userName}
                    onChange={e => {
                      this.setState({
                        userName: e.target.value
                      });
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardBody>
        <CardFooter style={{ flexDirection: "column" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.loginBtn}
          >
            بازیابی رمزعبور
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.googleBtn}
            component={GoogleLoginBtn}
            success={this.props.loginWithGoogle}
            error={this.props.showInternalError}
          >
            google
          </Button>
          <NavLink to="/auth/login" style={{ alignSelf: "flex-end" }}>
            <Button color="primary">ورود به سایت</Button>
          </NavLink>
        </CardFooter>
      </form>
    );
  }
}

Forgot.propTypes = {
  showInternalError: PropTypes.func,
  loginWithGoogle: PropTypes.func,
  forgotPass: PropTypes.func,
  classes: PropTypes.object,
  history: PropTypes.object,
  auth: PropTypes.object
};

export default withStyles(styles)(Forgot);
