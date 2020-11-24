import React from "react";
import Loadable from "react-loadable";
import Loading from "components/Common/Loading.jsx";

const LoadableComponent = Loadable({
  loader: () => import("./usersContainer"),
  loading: Loading
});

const usersPage = props => <LoadableComponent {...props} />;
export default usersPage;
