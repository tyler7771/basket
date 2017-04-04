import { connect } from 'react-redux';
import CommentForm from './comment_form';
import { fetchListItems } from '../../actions/list_item_actions';
import { createComment, updateComment }
  from '../../actions/comment_actions';


  const mapStateToProps = (state, ownProps) => ({
    listItems: Object.keys(state.listItem.listItem).map(id => state.listItem.listItem[id]),
    currentUser: state.session.currentUser
  });

const mapDispatchToProps = (dispatch, formType) => {
  const processForm = (formType === 'Add') ? createComment : updateComment;

  return {
    fetchListItems: params => dispatch(fetchListItems(params)),
    processForm: listItem => dispatch(processForm(listItem)),
    formType
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
