import { connect } from "react-redux";
import {
  invokeAPI,
  appLogin,
  removeError,
  appResetPass,
  removeResetData
} from "app/appActions";
import LoginView from "./LoginLayout";
import { withRouter } from "react-router-dom";
import { withSnackbar } from "notistack";

const mapStateToProps = state => {
  return { ...state.app };
};

const mapDispatchToProps = dispatch => {
  return {
    login: params => {
      dispatch(
        invokeAPI({
          path: "api/auth/signin",
          method: "POST",
          params: params,
          done: appLogin
        })
      );
    },
    forgotPass: params => {
      dispatch(
        invokeAPI({
          path: `api/auth/reset/request/${params.username}`,
          method: "GET",
          params: params,
          done: appResetPass
        })
      );
    },
    resetPass: params => {
      dispatch(
        invokeAPI({
          path: "api/auth/reset/response",
          method: "POST",
          params: params,
          done: appLogin
        })
      );
    },
    register: params => {
      dispatch(
        invokeAPI({
          path: "api/auth/signup",
          method: "POST",
          params: params,
          done: appLogin
        })
      );
    },
    loginWithGoogle: params => {
      dispatch(
        invokeAPI({
          path: "api/auth/google",
          method: "POST",
          params: params,
          done: appLogin
        })
      );
    },
    removeErrors: () => {
      dispatch(removeError());
    },
    removeResetData: () => {
      dispatch(removeResetData());
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withSnackbar(LoginView))
);
