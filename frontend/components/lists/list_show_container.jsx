import { connect } from 'react-redux';
import ListShow from './list_show';
import { fetchList, updateList } from '../../actions/list_actions';
import { fetchUsers } from '../../actions/user_actions';
import { fetchListItems, deleteListItem, createListItem, updateListItem }
  from '../../actions/list_item_actions';
import { fetchSearchResults } from '../../actions/search_actions';
import { createAssociation } from '../../actions/association_actions';

const mapStateToProps = (state, ownProps) => ({
    list: state.list.list[ownProps.params.listid],
    listItems: Object.keys(state.listItem.listItem).map(id => state.listItem.listItem[id]),
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
    fetchListItems: id => dispatch(fetchListItems(id)),
    deleteListItem: id => dispatch(deleteListItem(id)),
    updateListItem: item => dispatch(updateListItem(item)),
    createAssociation: params => dispatch(createAssociation(params))
});
console.log(createAssociation);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListShow);
