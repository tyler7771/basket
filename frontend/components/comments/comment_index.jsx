import React from 'react';
import { Link, hashHistory } from 'react-router';
import CommentItem from './comment_container';
import CommentForm from './comment_form_container';

class CommentIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {commentFormStatus: "Closed",
                  list_id: this.props.listid};
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

  commentHeader() {
    if (this.state.commentFormStatus === "Closed") {
      return (
        <div className="comment-header">
          <h1>Comments</h1>
          <a onClick={ () => this.setState({commentFormStatus: "Open"}) }>
            New
          </a>
        </div>
      );
    } else {
      return (
        <div className="comment-header">
          <h1>Comments</h1>
          <a onClick={ () => this.setState({commentFormStatus: "Closed"}) }>
            Close
          </a>
          <CommentForm formType="Add"
            listId={this.props.listid}
            action={this.props.createComment}/>
        </div>
      );
    }
  }

  render () {
    return (
      <div className="comments-show">
        {this.commentHeader()}
        <ul>
          {
            this.props.comments.map(comment => (
              <CommentItem
                key={comment.id}
                comment={comment}
                listId={this.props.listid} />
            ))
          }
        </ul>
      </div>
    );
  }
}

export default CommentIndex;
