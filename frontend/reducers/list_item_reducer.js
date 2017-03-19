import { RECEIVE_ALL_LIST_ITEMS,
         RECEIVE_LIST_ITEM,
         REMOVE_LIST_ITEM,
         RECEIVE_ERRORS,
          REMOVE_ERRORS} from '../actions/list_item_actions';
import merge from 'lodash/merge';

const _default = {
    listItem: {},
    errors: []
};

const ListItemsReducer = (oldState = _default, action) => {
  switch (action.type) {
    case RECEIVE_ALL_LIST_ITEMS:
      return {listItem: action.listItems, errors: []};
    case RECEIVE_LIST_ITEM:
    debugger
    const listItem = merge({}, oldState.listItem);
      listItem[action.listItem.id] = action.listItem;
      return merge({}, oldState, {listItem, errors: []});
    case REMOVE_LIST_ITEM:
      let newState = merge({}, oldState);
      for(let attr in newState) {
        delete newState[attr][action.listItem.id];
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

export default ListItemsReducer;
