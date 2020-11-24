/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import customerRoutes from "routes/customer";
import adminRoutes from "routes/admin";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import image from "assets/img/sideback.png";
import logo from "assets/img/advest.svg";
import Warning from "@material-ui/icons/Warning";
import Error from "@material-ui/icons/Error";
import Loading from "components/Common/Loading.jsx";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      displayAlert: false,
      alert:{
        title:"",
        text:"",
        handleClose: null
      }
    };
    this.resizeFunction = this.resizeFunction.bind(this);
    this.destroyAlert = this.destroyAlert.bind(this);
    this.setupAlert = this.setupAlert.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.setupNotification = this.setupNotification.bind(this);
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }

  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);

    if(this.showUserHint(this.props)){
      this.props.enqueueSnackbar("به منظور استفاده از تمام امکانات سامانه می بایست اطلاعات کاربری خود را کامل کنید",
        {
          variant: 'default',
          open: false,
          autoHideDuration: 10000,
          action: <Button color="secondary" size="small">تکمیل اطلاعات</Button>,
          onClickAction:(e) => { //@TODO fixed bug
            this.props.history.push('/profile');
            return false
          }
        }
      )
    }
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }

    if (this.props.error) {
      this.props.enqueueSnackbar(
        this.props.errorMessage || "در برقراری ارتباط خطایی پیش آمد",
        {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
          }
        }
      );
      this.props.removeError();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }

  showUserHint(props){
    const {user} = props
    let isAdmin = false
    user.roles.forEach(role => {
      role.name == "ROLE_ADMIN" ? isAdmin = true : ''
    })
    return (props.location.pathname !== "/profile" && !isAdmin && !(user.email && user.name && user.mobile && user.nationalCode))
  }

  setupAlert(options){
    this.setState({
      displayAlert: true,
      alert:{
        title: options.title,
        text: options.text,
        handleClose: options.handleClose
      }
    })
  }
  closeAlert(){
    this.setState({
      displayAlert: false
    })
  }

  destroyAlert(agreed){
    this.state.alert.handleClose(agreed);
    this.setState({
      displayAlert: false
    })
  }

  setupNotification(options){
    this.props.enqueueSnackbar(
      options.message,
      {
        variant: options.type || "info",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left"
        }
      }
    );
  }

  render() {
    const { classes, ...rest } = this.props;
    const dashboardRoutes = rest.user.isAdmin? adminRoutes : customerRoutes;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"ادوِست"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="purple"
          accountType={this.props.user.accountType}
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            showUserHint = {this.showUserHint(this.props)}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>
                {dashboardRoutes.map((prop, key) => {
                  if (prop.redirect)
                    return <Redirect from={prop.path} to={prop.to} key={key} />;
                  return <Route path={prop.path} key={key}
                    render={props => (
                      <prop.component {...props}
                        showAlert={this.setupAlert}
                        closeAlert={this.closeAlert}
                        showNotification={this.setupNotification} />
                    )} />;
                })}
              </Switch>
            </div>
          </div>

          <Dialog
            open={this.state.displayAlert}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{this.state.alert.title}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {this.state.alert.text}
              </DialogContentText>
            </DialogContent>
            {this.state.alert.handleClose?
            <DialogActions>
              <Button onClick={()=>{this.destroyAlert(true)}} color="primary">
                بلی
              </Button>
              <Button onClick={()=>{this.destroyAlert(false)}} color="primary" autoFocus>
                خیر
              </Button>
            </DialogActions>
            :null}
          </Dialog>

        </div>
        {this.props.loading?<Loading pastDelay />:null}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(App);
