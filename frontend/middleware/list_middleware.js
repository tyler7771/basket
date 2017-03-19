import {
  receiveList,
  receiveAllLists,
  removeList,
  FETCH_LISTS,
  FETCH_LIST,
  CREATE_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  receiveErrors
} from '../actions/list_actions';

import {
  createList,
  deleteList,
  updateList,
  fetchLists,
  fetchList
} from '../util/list_api_util';
import { hashHistory } from 'react-router';

const ListsMiddleware = ({ getState, dispatch }) => next => action => {
  const errorCallback = xhr => dispatch(receiveErrors(xhr.responseJSON));
  let fetchAllListsSuccess = lists => dispatch(receiveAllLists(lists));
  let fetchListSuccess = list => dispatch(receiveList(list));
  let createListSuccess = list => {
    dispatch(receiveList(list));
    hashHistory.push(`/list/${Object.keys(list)[0]}`);
  };
  let removeListSuccess = id => {
    hashHistory.push("/");
    dispatch(removeList(id));
  };

  switch (action.type) {
    case FETCH_LISTS:
      fetchLists(fetchAllListsSuccess);
      return next(action);
    case FETCH_LIST:
      fetchList(action.list, fetchListSuccess);
      return next(action);
    case CREATE_LIST:
      createList(action.list, createListSuccess, errorCallback);
      return next(action);
    case UPDATE_LIST:
      updateList(action.list, fetchListSuccess);
      return next(action);
    case DELETE_LIST:
      deleteList(action.id, removeListSuccess);
      return next(action);
    default:
      next(action);
  }
};

export default ListsMiddleware;
