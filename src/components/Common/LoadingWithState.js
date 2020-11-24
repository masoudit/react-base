import { connect } from "react-redux";
import Loading from "./Loading";

const mapStateToProps = state => {
  return { ...state.app };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loading);
