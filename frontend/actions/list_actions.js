export const FETCH_LISTS = "FETCH_LISTS";
export const FETCH_LIST = "FETCH_LIST";
export const RECEIVE_ALL_LISTS = "RECEIVE_ALL_LISTS";
export const RECEIVE_LIST = "RECEIVE_LIST";
export const REMOVE_LIST = "REMOVE_LIST";
export const CREATE_LIST = "CREATE_LIST";
export const UPDATE_LIST = "UPDATE_LIST";
export const DELETE_LIST = "DELETE_LIST";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const REMOVE_ERRORS = "REMOVE_ERRORS";

export const fetchLists = () => ({
  type: FETCH_LISTS,
});

export const fetchList = (list) => ({
  type: FETCH_LIST,
  list
});

export const createList = (list) => ({
  type: CREATE_LIST,
  list
});

export const updateList = (list) => ({
  type: UPDATE_LIST,
  list
});

export const deleteList = (id) => ({
  type: DELETE_LIST,
  id
});

export const receiveAllLists = (lists) => ({
  type: RECEIVE_ALL_LISTS,
  lists
});

export const receiveList = (list) => ({
  type: RECEIVE_LIST,
  list
});

export const removeList = (list) => ({
  type: REMOVE_LIST,
  list
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const removeErrors = () => ({
  type: REMOVE_ERRORS
});
