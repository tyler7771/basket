import { applyMiddleware } from 'redux';
import SessionMiddleware from './session_middleware';
import ListMiddleware from './list_middleware';
import UserMiddleware from './user_middleware';
import ListItemMiddleware from './list_item_middleware';
import SearchResultMiddleware from './search_middleware';
import AssociationMiddleware from './association_middleware';
import CommentMiddleware from './comment_middleware';

const RootMiddleware = applyMiddleware(
  SessionMiddleware,
  ListMiddleware,
  UserMiddleware,
  ListItemMiddleware,
  SearchResultMiddleware,
  AssociationMiddleware,
  CommentMiddleware
);

export default RootMiddleware;
