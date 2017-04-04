import { connect } from 'react-redux';
import CommentItem from './comment';
import { fetchListItems } from '../../actions/comment_actions';
import { deleteComment, updateComment }
  from '../../actions/comment_actions';

const mapStateToProps = (state, ownProps) => ({
    comments: Object.keys(state.comments.comment).map(id => state.comments.comment[id]),
    currentUser: state.session.currentUser
});

const mapDispatchToProps = dispatch => ({
    fetchListItems: id => dispatch(fetchListItems(id)),
    deleteComment: id => dispatch(deleteComment(id)),
    updateComment: item => dispatch(updateComment(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentItem);
