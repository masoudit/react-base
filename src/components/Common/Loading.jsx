import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles"
import loadingStyle from "assets/jss/material-dashboard-react/components/loadingStyle.jsx";

const Loading = ({ ...props }) => {
  const reload = () => {
    if(props.prevAction){
      props.dispatch(props.prevAction)
    }else{
      props.retry()
    }
  }
  const { classes } = props;
  if (props.error) {
    return (
      <React.Fragment>
        خطا! <button onClick={reload}>تلاش مجدد</button>
      </React.Fragment>
    );
  } else if (props.timedOut) {
    return (
      <React.Fragment>
        خیلی طول کشید... <button onClick={reload}>تلاش مجدد</button>
      </React.Fragment>
    );
  } else if (props.pastDelay || props.loading) {
    return (
      <div className={classes.wrapper}>
        <div className={classes.spinner} />
      </div>
    );
  } else {
    return null;
  }
};

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.bool,
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool,
  loading: PropTypes.bool,
  retry: PropTypes.func,
  dispach: PropTypes.func,
  prevAction: PropTypes.object,
};

export default withStyles(loadingStyle)(Loading);
