import React from 'react';
import { Link } from 'react-router';
import CommentForm from './comment_form_container';

class CommentItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {updateCommentFormStatus: "Closed"};
    this.handleDelete = this.handleDelete.bind(this);
    this.closeUpdateForm = this.closeUpdateForm.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteComment(this.props.comment.id);
  }

  name(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  commentTitle() {
    const name = this.name(this.props.comment.user.username);
    if (this.props.comment.item) {
      const item = this.name(this.props.comment.item.name);
      return (
        <p className="comment-title">
          {name} in regards to {item}:
        </p>
      );
    } else {
      return (
        <p className="comment-title">
          {name}:
        </p>
      );
    }
  }

  commentEdit() {
    if (this.props.currentUser.id === this.props.comment.user.id) {
      return (
        <div className="comment-edit">
          <img onClick={this.handleDelete}
            className="comment-item-delete"
            src="/assets/trash_can.png" />
          <a onClick={() => this.setState({updateCommentFormStatus: "Open"})}>
            Edit
          </a>
        </div>
      );
    }
  }

  display() {
    const comment = this.props.comment;
    if (this.state.updateCommentFormStatus === "Closed") {
      return (
        <div className="comment-item">
          {this.commentTitle()}
          <p className="comment-item-content">{comment.content}</p>
        </div>
      );
    } else {
      return (
        <div className="comment-item-form">
          <CommentForm formType="Update"
            comment={this.props.comment}
            commentId={this.props.comment.id}
            listId={this.props.listId}
            closeUpdateForm={this.closeUpdateForm}
            action={this.props.updateComment}/>
        </div>
      );
    }
  }

  closeUpdateForm() {
    this.setState({updateCommentFormStatus: "Closed"});
  }

  render () {
    if (!this.props.comment) {
      return <div>Loading...</div>;
    } else {
      return (
        <li className="comment">
          {this.display()}
          {this.commentEdit()}
        </li>
      );
    }
  }
}

export default CommentItem;
