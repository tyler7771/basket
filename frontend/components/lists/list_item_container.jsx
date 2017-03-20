import { connect } from 'react-redux';
import ListItem from './list_item';
import { fetchUsers } from '../../actions/user_actions';
import { deleteListItem, updateListItem }
  from '../../actions/list_item_actions';

const mapStateToProps = (state, ownProps) => ({
    users: Object.keys(state.users.user).map(id => state.users.user[id])
});

const mapDispatchToProps = dispatch => ({
    fetchUsers: params => dispatch(fetchUsers(params)),
    deleteListItem: id => dispatch(deleteListItem(id)),
    updateListItem: item => dispatch(updateListItem(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItem);
