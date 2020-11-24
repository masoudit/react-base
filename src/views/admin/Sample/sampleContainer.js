import { connect } from "react-redux";
import { sampleDataFetched } from "./sampleActions";
import { invokeAPI } from "app/appActions";
import View from "./SampleView";
import { withRouter } from "react-router-dom";
import withDataFetcher from "app/withDataFetcher";

const mapStateToProps = state => {
  return { ...state.sample };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => {
      dispatch(
        invokeAPI({
          path: "sample/data", //NOTE: this is a mock API, see "app/api.js"
          done: sampleDataFetched
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
