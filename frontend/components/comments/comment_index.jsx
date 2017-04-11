import React from 'react';
import { Link, hashHistory } from 'react-router';
import CommentItem from './comment_container';
import CommentForm from './comment_form_container';

class CommentIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {commentFormStatus: "Closed",
                  list_id: this.props.listid};
    this.closeCommentForm = this.closeCommentForm.bind(this);
  }

  componentDidMount() {
    this.props.fetchComments({id: this.props.listid});
  }

  componentWillReceiveProps(newProps) {
    if (newProps.listid !== this.props.listid) {
      this.props.fetchComments({id: newProps.listid});
    }
  }

  name (name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  commentHeader(type) {
    if (this.state.commentFormStatus === "Closed") {
      return (
        <div className={this.props.type === "mobile" ?
           "comments-header-mobile" : "comment-header"}>
          <h1>Comments</h1>
          <a onClick={ () => this.setState({commentFormStatus: "Open"}) }>
            New
          </a>
        </div>
      );
    } else {
      return (
        <div className={this.props.type === "mobile" ?
           "comments-header-mobile" : "comment-header"}>
          <h1>Comments</h1>
          <a onClick={ () => this.closeCommentForm() }>
            Close
          </a>
          <CommentForm formType="Add"
            listId={this.props.listid}
            action={this.props.createComment}
            closeCommentForm={this.closeCommentForm}
            type={type}/>
        </div>
      );
    }
  }

  closeCommentForm() {
    this.setState({commentFormStatus: "Closed"});
  }

  render () {
    return (
      <div className={this.props.type === "mobile" ?
         "comments-show-mobile" : "comments-show"}>
        {this.commentHeader(this.props.type)}
        <ul className={this.props.type === "mobile" ?
           "comment-index-mobile" : ""}>
          {
            this.props.comments.map(comment => (
              <CommentItem
                key={comment.id}
                comment={comment}
                listId={this.props.listid}
                type={this.props.type} />
            ))
          }
        </ul>
      </div>
    );
  }
}

export default CommentIndex;
