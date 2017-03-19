import {
  receiveListItem,
  receiveAllListItems,
  removeListItem,
  FETCH_LIST_ITEMS,
  FETCH_LIST_ITEM,
  CREATE_LIST_ITEM,
  UPDATE_LIST_ITEM,
  DELETE_LIST_ITEM,
  receiveErrors
} from '../actions/list_item_actions';

import {
  createListItem,
  deleteListItem,
  updateListItem,
  fetchListItems,
  fetchListItem
} from '../util/list_item_api_util';
import { hashHistory } from 'react-router';

const ListItemsMiddleware = ({ getState, dispatch }) => next => action => {
  const errorCallback = xhr => dispatch(receiveErrors(xhr.responseJSON));
  let fetchAllListItemsSuccess = listItems => dispatch(receiveAllListItems(listItems));
  let fetchListItemSuccess = listItem => dispatch(receiveListItem(listItem));
  let removeListItemSuccess = item => {
    dispatch(removeListItem(item));
  };

  switch (action.type) {
    case FETCH_LIST_ITEMS:
      fetchListItems(action.list, fetchAllListItemsSuccess);
      return next(action);
    case FETCH_LIST_ITEM:
      fetchListItem(action.list, fetchListItemSuccess);
      return next(action);
    case CREATE_LIST_ITEM:
      createListItem(action.listItem, fetchListItemSuccess, errorCallback);
      return next(action);
    case UPDATE_LIST_ITEM:
      updateListItem(action.item, fetchListItemSuccess);
      return next(action);
    case DELETE_LIST_ITEM:
      deleteListItem(action.id, removeListItemSuccess);
      return next(action);
    default:
      next(action);
  }
};

export default ListItemsMiddleware;
