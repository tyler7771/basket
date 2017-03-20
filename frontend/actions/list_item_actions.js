export const FETCH_LIST_ITEMS = "FETCH_LIST_ITEMS";
export const FETCH_LIST_ITEM = "FETCH_LIST_ITEM";
export const RECEIVE_ALL_LIST_ITEMS = "RECEIVE_ALL_LIST_ITEMS";
export const RECEIVE_LIST_ITEM = "RECEIVE_LIST_ITEM";
export const REMOVE_LIST_ITEM = "REMOVE_LIST_ITEM";
export const CREATE_LIST_ITEM = "CREATE_LIST_ITEM";
export const UPDATE_LIST_ITEM = "UPDATE_LIST_ITEM";
export const DELETE_LIST_ITEM = "DELETE_LIST_ITEM";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const REMOVE_ERRORS = "REMOVE_ERRORS";

export const fetchListItems = (params) => ({
  type: FETCH_LIST_ITEMS,
  params
});

export const fetchListItem = (list) => ({
  type: FETCH_LIST_ITEM,
  list
});

export const createListItem = (listItem) => ({
  type: CREATE_LIST_ITEM,
  listItem
});

export const updateListItem = (item) => ({
  type: UPDATE_LIST_ITEM,
  item
});

export const deleteListItem = (id) => ({
  type: DELETE_LIST_ITEM,
  id
});

export const receiveAllListItems = (listItems) => ({
  type: RECEIVE_ALL_LIST_ITEMS,
  listItems
});

export const receiveListItem = (listItem) => ({
  type: RECEIVE_LIST_ITEM,
  listItem
});

export const removeListItem = (listItem) => ({
  type: REMOVE_LIST_ITEM,
  listItem
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const removeErrors = () => ({
  type: REMOVE_ERRORS
});
