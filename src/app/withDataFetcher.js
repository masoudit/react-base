import React from "react";
import Loading from "components/Common/LoadingWithState.js";

const withDataFetcher = WrappedComponent => {
  return class dataFetcherWrapper extends React.Component {
    componentDidMount() {
      // if (!this.props.loaded) {
      this.props.fetchData();
      // }
    }

    render() {
      return (
        <React.Fragment>
          {this.props.loaded ? (
            <WrappedComponent {...this.props} />
          ) : (
            <Loading pastDelay={this.props.loading} error={this.props.error} />
          )}
        </React.Fragment>
      );
    }
  };
};

export default withDataFetcher;
