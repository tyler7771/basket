import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import ListReducer from './list_reducer';
import UsersReducer from './user_reducer';
import ListItemReducer from './list_item_reducer';
import SearchResultReducer from './search_reducer';
import CommentReducer from './comment_reducer';

const RootReducer = combineReducers({
    session: SessionReducer,
    list: ListReducer,
    users: UsersReducer,
    listItem: ListItemReducer,
    results: SearchResultReducer,
    comments: CommentReducer
});

export default RootReducer;
