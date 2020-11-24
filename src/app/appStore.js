import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware, { END } from "redux-saga";
import appReducer from "./appReducer";

export default initialState => {
  const sagaMiddleware = createSagaMiddleware();
  let middleware = [sagaMiddleware];
  const composeEnhancers =
    (process.env.NODE_ENV !== "production" &&
      typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25
      })) ||
    compose;

  const store = createStore(
    appReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
};
