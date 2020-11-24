import React from "react";
import Loadable from "react-loadable";
import Loading from "components/Common/Loading.jsx";

const LoadableComponent = Loadable({
  loader: () => import("./sampleContainer"),
  loading: Loading
});

const SamplePage = props => <LoadableComponent {...props} />;
export default SamplePage;
