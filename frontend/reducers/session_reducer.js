import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS, LOGOUT }
  from "../actions/session_actions";
import { merge } from 'lodash';

const _default = {
    currentUser: null,
    errors: []
};

const SessionReducer = (state = _default, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      let newState = {currentUser: action.currentUser,
        errors: []};
      return newState;
    case RECEIVE_ERRORS:
      return merge({}, state, action.errors);
    case LOGOUT:
      return _default;
    default:
      return state;
  }
};

export default SessionReducer;
