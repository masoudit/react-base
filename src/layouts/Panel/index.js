import React from "react";
import Loadable from "react-loadable";
import Loading from "components/Common/Loading.jsx";

const LoadableComponent = Loadable({
  loader: () => import("./panelContainer"),
  loading: Loading
});

const Panel = props => <LoadableComponent {...props} />;
export default Panel;
