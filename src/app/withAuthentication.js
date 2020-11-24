import React from "react";
import { Redirect } from "react-router-dom";

const withAuthentication = WrappedComponent => {
  const wrapper = props => (
    <React.Fragment>
      {props.token ? (
        <WrappedComponent {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/auth",
            state: { referrer: props.location.pathname }
          }}
        />
      )}
    </React.Fragment>
  );
  return wrapper;
};

export default withAuthentication;
