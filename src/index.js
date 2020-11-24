import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { SnackbarProvider } from "notistack";

import indexRoutes from "routes/index.jsx";
import configStore from "./app/appStore";
import rootSaga from "./app/appSagas";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";

import { getUserToken } from "libs/userToken";

import "assets/css/material-dashboard-react.css?v=1.5.0";

const initState = {
  app: {
    token: getUserToken()
  }
};
const store = configStore(initState);
store.runSaga(rootSaga);

const advestTheme = createMuiTheme({
  typography: {
    fontFamily: '"IranSans", sans-serif'
  },
  direction: "rtl",
  palette: {
    primary: { main: "#662d91" },
    secondary: { main: "#36b3b3" }
  }
});
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const generateClassName = createGenerateClassName();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={advestTheme}>
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <SnackbarProvider maxSnack={3}>
          <Router>
            <Switch>
              {indexRoutes.map((prop, key) => {
                return (
                  <Route
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              })}
            </Switch>
          </Router>
        </SnackbarProvider>
      </JssProvider>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
