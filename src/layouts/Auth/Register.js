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
import Lock from "@material-ui/icons/Lock";
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

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      rePass: ""
    };
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    this.props.register({
      username: this.state.userName,
      password: this.state.password,
      confirmedPassword: this.state.rePass
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.submitForm}>
        <CardBody>
          <div className={classes.slogan}>ثبت نام در ادوِست</div>
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
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <Lock />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="password"
                    label="رمزعبور"
                    type="password"
                    fullWidth
                    required
                    error={this.state.password !== this.state.rePass}
                    value={this.state.password}
                    onChange={e => {
                      this.setState({
                        password: e.target.value
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={8} alignItems="flex-end">
                <Grid item>
                  <Lock />
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="password"
                    label="تکرار رمزعبور"
                    type="password"
                    fullWidth
                    required
                    error={this.state.password !== this.state.rePass}
                    value={this.state.rePass}
                    onChange={e => {
                      this.setState({
                        rePass: e.target.value
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
            ثبت نام
          </Button>
          <hr style={{ width: "100%", color: "#e6e6e6" }} />
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
            <Button color="primary">قبلا ثبت نام کرده ام</Button>
          </NavLink>
        </CardFooter>
      </form>
    );
  }
}

Register.propTypes = {
  showInternalError: PropTypes.func,
  loginWithGoogle: PropTypes.func,
  register: PropTypes.func,
  classes: PropTypes.object
};

export default withStyles(styles)(Register);
