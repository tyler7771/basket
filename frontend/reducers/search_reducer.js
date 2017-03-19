import { RECEIVE_ALL_SEARCH_RESULTS } from '../actions/search_actions';
import merge from 'lodash/merge';

const _default = {
    results: {}
};

const SearchResultReducer = (oldState = _default, action) => {
  switch (action.type) {
    case RECEIVE_ALL_SEARCH_RESULTS:
      return {results: action.results};
    default:
      return oldState;
  }
};

export default SearchResultReducer;
