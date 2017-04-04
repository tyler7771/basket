import { connect } from 'react-redux';
import CommentIndex from './comment_index';
import { fetchComments, createComment } from '../../actions/comment_actions';
import { fetchListItems } from '../../actions/list_item_actions';

const mapStateToProps = (state, ownProps) => ({
    listItems: Object.keys(state.listItem.listItem).map(id => state.listItem.listItem[id]),
    comments: Object.keys(state.comments.comment).map(id => state.comments.comment[id]),
    currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
    fetchListItems: params => dispatch(fetchListItems(params)),
    fetchComments: id => dispatch(fetchComments(id)),
    createComment: comment => dispatch(createComment(comment)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentIndex);
