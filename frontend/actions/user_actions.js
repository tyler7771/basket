export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USER = "FETCH_USER";
export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const REMOVE_USER = "REMOVE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export const fetchUsers = (params) => ({
  type: FETCH_USERS,
  params
});

export const fetchUser = (user) => ({
  type: FETCH_USER,
  user
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  user
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  id
});

export const receiveAllUsers = (users) => ({
  type: RECEIVE_ALL_USERS,
  users
});

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
});

export const removeUser = (user) => ({
  type: REMOVE_USER,
  user
});
