import { receiveCurrentUser,
         receiveErrors,
         LOGIN,
         LOGOUT,
         SIGNUP
       } from '../actions/session_actions';

import { login, signup, logout } from '../util/session_api_util';
import { hashHistory } from 'react-router';

export default ({ getState, dispatch }) => next => action => {
  const successCallback = (user) => {
   dispatch(receiveCurrentUser(user));
   hashHistory.push("/");
 };
  const errorCallback = xhr => dispatch(receiveErrors(xhr.responseJSON));

  switch(action.type) {
    case LOGIN:
      login(action.user, successCallback, errorCallback);
      return next(action);
    case LOGOUT:
      logout(() => {
        hashHistory.push("/welcome");
        next(action);
      });
      break;
    case SIGNUP:
      signup(action.user, successCallback, errorCallback);
      return next(action);
    default:
      return next(action);
  }
};
