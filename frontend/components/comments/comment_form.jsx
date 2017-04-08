import React from 'react';
import { Link } from 'react-router';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {content: "",
                  list_item_id: "",
                  user_id: "",
                  list_id: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.formType.formType === "Add") {
      this.setState({list_id: this.props.listId,
        user_id: this.props.currentUser.id});
    } else {
      if (this.props.comment) {
        if (this.props.formType.formType === "Update") {
          this.setState({content: this.props.comment.content,
            list_item_id: this.props.comment.list_item_id,
            user_id: this.props.comment.user.id,
            list_id: this.props.listId});
        }
      }
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.listId !== this.props.listId) {
      if (this.props.formType.formType === "Add") {
        this.setState({list_id: this.props.listId,
          user_id: this.props.currentUser.id});
      } else {
        if (this.props.comment) {
          if (newProps.comment.id !== this.props.comment.id) {
            this.props.fetchListItems({id: newProps.listId});
          }
          this.setState({content: this.props.comment.content,
            list_item_id: this.props.comment.list_item_id,
            user_id: this.props.comment.user.id,
            list_id: this.props.listId});
        }
      }
    }
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const comment = this.state;
    if (this.props.formType.formType === "Update") {
      comment.id = this.props.comment.id;
    }
    if (comment.list_item_id !== "") {
      comment.list_item_id = parseInt(comment.list_item_id);
    }
    comment.list_id = parseInt(comment.list_id);

    this.props.action(comment);

    if (this.props.formType.formType === "Update") {
      this.props.closeUpdateForm();
    } else {
      this.setState({content: "", list_item_id: ""});
      this.props.closeCommentForm();
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit} className="new-comment-form">
        <textarea
          className="new-comment-content"
          placeholder="Comment"
          value={this.state.content}
          onChange={this.update("content")} />

        <div className="new-comment-item-and-submit">
          <select
            className="new-comment-item"
            value={this.state.list_item_id}
            onChange={this.update("list_item_id")}>
            <option>Assign to Item</option>
            {
              this.props.listItems.map(item => (
                <option key={item.id}
                  value={item.id}>{item.name}
                </option>
              ))
            }
          </select>

          <input className="new-item-form-submit"
            type="submit"
            value={this.props.formType.formType} />
        </div>
      </form>
    );
  }
}

export default CommentForm;
