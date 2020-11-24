import { SAMPLE_DATA_FETCHED } from "./sampleActions";

//NOTE: add this to "app/appReducer"
export default (state = "", action) => {
  switch (action.type) {
    case SAMPLE_DATA_FETCHED:
      return Object.assign({}, { loaded: true }, action.data);
    default:
      return state;
  }
};
