import React from 'react';
import { Link, hashHistory } from 'react-router';

class ListIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteList(this.props.list.id);
  }

  name (name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  render () {
    return (
      <Link to={`/list/${this.props.list.id}`}>
        <li className={this.props.type === "mobile" ?
          "list-index-item-mobile" : "list-index-item"}>
          <h2 className="list-index-title">
            {this.name(this.props.list.name)}
          </h2>
          <div onClick={this.handleDelete}
            className={this.props.type === "mobile" ?
            "list-delete-mobile" : "list-delete"}>
            Delete
          </div>
        </li>
      </Link>
    );
  }
}

export default ListIndexItem;
