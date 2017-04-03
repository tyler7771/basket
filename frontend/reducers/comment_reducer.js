import { RECEIVE_ALL_COMMENTS,
         RECEIVE_COMMENT,
         REMOVE_COMMENT,
         RECEIVE_ERRORS,
          REMOVE_ERRORS} from '../actions/comment_actions';
import merge from 'lodash/merge';

const _default = {
    comment: {},
    errors: []
};

const CommentsReducer = (oldState = _default, action) => {
  switch (action.type) {
    case RECEIVE_ALL_COMMENTS:
      return {comment: action.comments, errors: []};
    case RECEIVE_COMMENT:
    const comment = merge({}, oldState.comment);
      comment[action.comment.id] = action.comment;
      return merge({}, oldState, {comment, errors: []});
    case REMOVE_COMMENT:
      let newState = merge({}, oldState);
      for(let attr in newState) {
        delete newState[attr][action.comment.id];
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

export default CommentsReducer;
