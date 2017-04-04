import { connect } from 'react-redux';
import ListShow from './list_show';
import { fetchList, updateList } from '../../actions/list_actions';
import { fetchUsers } from '../../actions/user_actions';
import { fetchListItems, deleteListItem, createListItem, updateListItem }
  from '../../actions/list_item_actions';
import { fetchComments, createComment } from '../../actions/comment_actions';
import { fetchSearchResults } from '../../actions/search_actions';
import { createAssociation } from '../../actions/association_actions';

const mapStateToProps = (state, ownProps) => ({
    list: state.list.list[ownProps.params.listid],
    listItems: Object.keys(state.listItem.listItem).map(id => state.listItem.listItem[id]),
    comments: Object.keys(state.comments.comment).map(id => state.comments.comment[id]),
    searchResults: Object.keys(state.results.results).map(id => state.results.results[id]),
    users: Object.keys(state.users.user).map(id => state.users.user[id]),
    currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
    fetchList: id => dispatch(fetchList(id)),
    updateList: list => dispatch(updateList(list)),
    fetchUsers: params => dispatch(fetchUsers(params)),
    fetchSearchResults: params => dispatch(fetchSearchResults(params)),
    createListItem: listItem => dispatch(createListItem(listItem)),
    fetchListItems: params => dispatch(fetchListItems(params)),
    deleteListItem: id => dispatch(deleteListItem(id)),
    updateListItem: item => dispatch(updateListItem(item)),
    createAssociation: params => dispatch(createAssociation(params)),
    fetchComments: id => dispatch(fetchComments(id)),
    createComments: comment => dispatch(createComment(comment)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListShow);
