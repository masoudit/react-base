import { connect } from "react-redux";
import { panelDataFetched } from "./panelActions";
import { invokeAPI, appLogout, removeError } from "app/appActions";
import PanelView from "./PanelView";
import { withRouter } from "react-router-dom";
import withDataFetcher from "app/withDataFetcher";
import withAuthentication from "app/withAuthentication";
import { withSnackbar } from "notistack";

const mapStateToProps = state => {
  return {
    ...state.panel,
    token: state.app.token,
    loading: state.app.loading,
    error: state.app.error,
    errorMessage: state.app.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => {
      dispatch(
        invokeAPI({
          path: "api/user/get",
          done: panelDataFetched,
          error: appLogout
        })
      );
    },
    logout: () => {
      dispatch(appLogout());
    },
    removeError: () => {
      dispatch(removeError());
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withSnackbar(withAuthentication(withDataFetcher(PanelView))))
);
