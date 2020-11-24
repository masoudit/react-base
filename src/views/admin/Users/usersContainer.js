import { connect } from "react-redux";
import { usersDataFetched } from "./usersActions";
import { invokeAPI } from "app/appActions";
import View from "./usersView";
import { withRouter } from "react-router-dom";
import withDataFetcher from "app/withDataFetcher";

const mapStateToProps = state => {
  return { ...state.adminUsers };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: params => {
      const defaultParams = {
        pageNumber: "1",
        pageSize: "5",
        sortField: "id",
        order: "DESC",
        roleFilters: []
      };
      const param = params
        ? Object.assign(defaultParams, params)
        : defaultParams;
      dispatch(
        invokeAPI({
          path: "admin/api/user/list", //NOTE: this is a mock API, see "app/api.js"
          params: param,
          done: usersDataFetched
        })
      );
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withDataFetcher(View))
);
