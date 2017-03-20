import { connect } from 'react-redux';
import ListItemForm from './list_item_form';
import { fetchUsers } from '../../actions/user_actions';
import { createListItem, updateListItem }
  from '../../actions/list_item_actions';


  const mapStateToProps = (state, ownProps) => ({
      users: Object.keys(state.users.user).map(id => state.users.user[id]),
  });

const mapDispatchToProps = (dispatch, formType) => {
  const processForm = (formType === 'Add') ? createListItem : updateListItem;

  return {
    fetchUsers: params => dispatch(fetchUsers(params)),
    processForm: user => dispatch(processForm(user)),
    formType
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListItemForm);
