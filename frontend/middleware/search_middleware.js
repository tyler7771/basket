import {receiveAllSearchResults,
        FETCH_SEARCH_RESULTS
} from '../actions/search_actions';

import { fetchSearchResults } from '../util/search_api_util';
import { hashHistory } from 'react-router';

const SearchResultssMiddleware = ({ getState, dispatch }) => next => action => {
  let fetchAllSearchResultsSuccess = searchResults =>
    dispatch(receiveAllSearchResults(searchResults));

  switch (action.type) {
    case FETCH_SEARCH_RESULTS:
      fetchSearchResults(action.params, fetchAllSearchResultsSuccess);
      return next(action);
    default:
      next(action);
  }
};

export default SearchResultssMiddleware;
