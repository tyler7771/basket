import { RECEIVE_ALL_USERS,
         RECEIVE_USER,
         REMOVE_USER} from '../actions/user_actions';
import merge from 'lodash/merge';

const _default = {
    user: {},
    errors: []
};

const UsersReducer = (oldState = _default, action) => {
  switch (action.type) {
    case RECEIVE_ALL_USERS:
      return {user: action.users, errors: []};
    case RECEIVE_USER:
      return merge({}, oldState, {user: action.user, errors: []});
    case REMOVE_USER:
      let newState = merge({}, oldState);
      for(let attr in newState) {
        delete newState[attr][action.user.id];
      }
      return newState;
    default:
      return oldState;
  }
};

export default UsersReducer;
