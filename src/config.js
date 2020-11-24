const config = {
  production: {
    API: process.env.REACT_APP_API_URL || "/main_api/"
  },
  development: {
    API: process.env.REACT_APP_API_URL || "/staging_api/"
  }
};
exports.get = function get() {
  return config[process.env.NODE_ENV] || config.production;
};
