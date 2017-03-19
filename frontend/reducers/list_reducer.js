import { RECEIVE_ALL_LISTS,
         RECEIVE_LIST,
         REMOVE_LIST,
         RECEIVE_ERRORS,
          REMOVE_ERRORS} from '../actions/list_actions';
import merge from 'lodash/merge';

const _default = {
    list: {},
    errors: []
};

const ListsReducer = (oldState = _default, action) => {
  switch (action.type) {
    case RECEIVE_ALL_LISTS:
      return {list: action.lists, errors: []};
    case RECEIVE_LIST:
      return merge({}, oldState, {list: action.list, errors: []});
    case REMOVE_LIST:
      let newState = merge({}, oldState);
      for(let attr in newState) {
        delete newState[attr][action.list.id];
      }
      return newState;
    case RECEIVE_ERRORS:
      return merge({}, oldState, action.errors);
    case REMOVE_ERRORS:
      let removeState = merge({}, oldState);
      removeState.errors = [];
      return removeState;
    default:
      return oldState;
  }
};

export default ListsReducer;
