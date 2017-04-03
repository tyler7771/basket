import {
  receiveComment,
  receiveAllComments,
  removeComment,
  FETCH_COMMENTS,
  FETCH_COMMENT,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  receiveErrors
} from '../actions/comment_actions';

import {
  createComment,
  deleteComment,
  updateComment,
  fetchComments,
  fetchComment
} from '../util/comment_api_util';
import { hashHistory } from 'react-router';

const CommentsMiddleware = ({ getState, dispatch }) => next => action => {
  const errorCallback = xhr => dispatch(receiveErrors(xhr.responseJSON));
  let fetchAllCommentsSuccess = comments => dispatch(receiveAllComments(comments));
  let fetchCommentSuccess = comment => dispatch(receiveComment(comment));
  let removeCommentSuccess = comment => {
    dispatch(removeComment(comment));
  };

  switch (action.type) {
    case FETCH_COMMENTS:
      fetchComments(action.params, fetchAllCommentsSuccess);
      return next(action);
    case FETCH_COMMENT:
      fetchComment(action.list, fetchCommentSuccess);
      return next(action);
    case CREATE_COMMENT:
      createComment(action.comment, fetchCommentSuccess, errorCallback);
      return next(action);
    case UPDATE_COMMENT:
      updateComment(action.comment, fetchCommentSuccess);
      return next(action);
    case DELETE_COMMENT:
      deleteComment(action.id, removeCommentSuccess);
      return next(action);
    default:
      next(action);
  }
};

export default CommentsMiddleware;
