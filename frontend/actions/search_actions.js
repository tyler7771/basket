export const FETCH_SEARCH_RESULTS = "FETCH_SEARCH_RESULTS";
export const RECEIVE_ALL_SEARCH_RESULTS = "RECEIVE_ALL_SEARCH_RESULTS";

export const fetchSearchResults = (params) => ({
  type: FETCH_SEARCH_RESULTS,
  params
});

export const receiveAllSearchResults = (results) => ({
  type: RECEIVE_ALL_SEARCH_RESULTS,
  results
});
