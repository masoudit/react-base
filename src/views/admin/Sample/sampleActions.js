export const SAMPLE_DATA_FETCHED = "SAMPLE_DATA_FETCHED";

function action(type, data = {}) {
  return { type, ...data };
}

export const sampleDataFetched = data => action(SAMPLE_DATA_FETCHED, data);
