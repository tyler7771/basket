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

  commentTitle(type) {
    const name = this.name(this.props.comment.user.username);
    if (this.props.comment.item) {
      const item = this.name(this.props.comment.item.name);
      return (
        <p className={type === "mobile" ?
           "comment-title-mobile" : "comment-title"}>
          {name} in regards to {item}:
        </p>
      );
    } else {
      return (
        <p className={type === "mobile" ?
           "comment-title-mobile" : "comment-title"}>
          {name}:
        </p>
      );
    }
  }

  commentEdit(type) {
    if (this.props.currentUser.id === this.props.comment.user.id
      && this.state.updateCommentFormStatus === "Closed") {
      return (
        <div className={this.props.type === "mobile" ?
           "comment-edit-mobile" : "comment-edit"}>
          <img onClick={this.handleDelete}
            className={this.props.type === "mobile" ?
               "comment-delete-mobile" : "comment-item-delete"}
            src="/assets/trash_can.png" />
          <a onClick={() => this.setState({updateCommentFormStatus: "Open"})}>
            Edit
          </a>
        </div>
      );
    }
  }

  display(type) {
    const comment = this.props.comment;
    if (this.state.updateCommentFormStatus === "Closed") {
      return (
        <div className={type === "mobile" ?
           "comment-item-mobile" : "comment-item"}>
          {this.commentTitle()}
          <p className={type === "mobile" ?
             "comment-item-content-mobile" : "comment-item-content"}>
             {comment.content}
           </p>
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
            action={this.props.updateComment}
            type={type}/>
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
        <li className={this.props.type === "mobile" ?
           "comment-mobile" : "comment"}>
          {this.display(this.props.type)}
          {this.commentEdit(this.props.type)}
        </li>
      );
    }
  }
}

export default CommentItem;
