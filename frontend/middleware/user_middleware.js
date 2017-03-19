import {
  receiveUser,
  receiveAllUsers,
  removeUser,
  FETCH_USERS,
  FETCH_USER,
  UPDATE_USER,
  DELETE_USER,
} from '../actions/user_actions';

import {
  createUser,
  deleteUser,
  updateUser,
  fetchUsers,
  fetchUser
} from '../util/user_api_util';
import { hashHistory } from 'react-router';

const UsersMiddleware = ({ getState, dispatch }) => next => action => {
  let fetchAllUsersSuccess = users => dispatch(receiveAllUsers(users));
  let fetchUserSuccess = user => dispatch(receiveUser(user));
  let removeUserSuccess = id => {
    hashHistory.push("/");
    dispatch(removeUser(id));
  };

  switch (action.type) {
    case FETCH_USERS:
      fetchUsers(action.params, fetchAllUsersSuccess);
      return next(action);
    case FETCH_USER:
      fetchUser(action.user, fetchUserSuccess);
      return next(action);
    case UPDATE_USER:
      updateUser(action.user, fetchUserSuccess);
      return next(action);
    case DELETE_USER:
      deleteUser(action.id, removeUserSuccess);
      return next(action);
    default:
      next(action);
  }
};

export default UsersMiddleware;
