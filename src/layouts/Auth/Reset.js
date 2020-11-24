import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import TextField from "@material-ui/core/TextField";
import Lock from "@material-ui/icons/Lock";

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

class Reset extends React.Component {
  constructor(props) {
    super(props);
    this.keyIsHashed = props.match.params.key !== "sms";
    const code = this.getParameterByName("code", props.location.search);
    if (props.match.params.key === "email" && !code) {
      props.history.push("/");
    }
    this.state = {
      password: "",
      confirmedPassword: "",
      code: code
    };
    this.submitForm = this.submitForm.bind(this);
  }

  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  submitForm() {
    this.props.resetPass({
      password: this.state.password,
      confirmedPassword: this.state.confirmedPassword,
      code: this.state.code
    });
  }

  componentDidMount() {
    this.props.removeResetData();
  }

  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.submitForm}>
        <CardBody>
          <div className={classes.slogan}>بازنشانی رمزعبور </div>
          <Grid container>
            <Grid item xs={12}>
              {!this.keyIsHashed ? (
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                    <Lock />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      id="key"
                      label="کد ارسال شده به تلفن همراه"
                      required
                      fullWidth
                      value={this.state.key}
                      onChange={e => {
                        this.setState({
                          code: e.target.value
                        });
                      }}
                    />
                  </Grid>
                </Grid>
              ) : null}
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
                    error={this.state.password !== this.state.confirmedPassword}
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
                    error={this.state.password !== this.state.confirmedPassword}
                    value={this.state.confirmedPassword}
                    onChange={e => {
                      this.setState({
                        confirmedPassword: e.target.value
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
            بازنشانی رمزعبو
          </Button>
          <NavLink
            to="/auth/login"
            style={{ alignSelf: "flex-end", marginTop: "10px" }}
          >
            <Button color="primary">ورود به سایت</Button>
          </NavLink>
        </CardFooter>
      </form>
    );
  }
}

Reset.propTypes = {
  showInternalError: PropTypes.func,
  loginWithGoogle: PropTypes.func,
  resetPass: PropTypes.func,
  removeResetData: PropTypes.func,
  classes: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
};

export default withStyles(styles)(Reset);
