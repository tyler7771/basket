import React from 'react';
import { Link } from 'react-router';
import ListIndexItem from './list_index_item';

class ListIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = { newListFormStatus: "Closed", name: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchLists();
  }

  update() {
    return e => this.setState({
      name: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const list = this.state;
    this.props.createList({list});
    this.setState({newListFormStatus: "Closed", name: ""});
  }

  newListButton () {
    if (this.state.newListFormStatus === "Open") {
      return (
        <a onClick={ () => this.setState({newListFormStatus: "Closed"}) }>Close</a>
      );
    } else {
      return (
        <a onClick={ () => this.setState({newListFormStatus: "Open"}) }>New</a>
      );
    }
  }

  newListForm() {
    if (this.state.newListFormStatus === "Open") {
      return (
        <form onSubmit={this.handleSubmit} className="new-list-form">
          <input type="text"
            className="new-list-name"
            placeholder="List Name"
            value={this.state.name}
            onChange={this.update()} />
          <input type="submit" value="Create" />
        </form>
      );
    }
  }

  render () {
    return (
      <div className="list-index">
        <h1>{this.props.currentUser.username}</h1>
        <div className="new-list">
          <h2>My Lists</h2>
          {this.newListButton()}
        </div>
        {this.newListForm()}
        <ul>
            {
              this.props.lists.map(list => (
                <ListIndexItem
                  key={list.id}
                  deleteList={this.props.deleteList}
                  list={list} />
              ))
            }
          </ul>
      </div>
    );
  }
}

export default ListIndex;
