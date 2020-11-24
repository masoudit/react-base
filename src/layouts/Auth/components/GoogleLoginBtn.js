import React from "react";
import PropTypes from "prop-types";
import google from "assets/img/icons/google.svg";
import { GoogleLogin } from "react-google-login";

const GoogleLoginContainer = props => {
  return (
    <GoogleLogin
      clientId="910745060263-hhmbs8o8v4bohl5d1so955rlj4rcv5mq.apps.googleusercontent.com"
      onSuccess={data => {
        props.success({
          profileObj: data.profileObj,
          tokenObj: data.tokenObj
        });
      }}
      onFailure={data => {
        props.error(data.details);
      }}
      className={props.className}
    >
      ورود با گوگل
      <img
        src={google}
        alt="ورود با گوگل"
        style={{ width: "20px", marginRight: "10px" }}
      />
    </GoogleLogin>
  );
};
GoogleLoginContainer.propTypes = {
  className: PropTypes.string,
  success: PropTypes.func,
  error: PropTypes.func
};

export default GoogleLoginContainer;
