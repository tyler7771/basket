import React from 'react';
import { Link, hashHistory } from 'react-router';
import ListIndex from './list_index_container';
import ListItem from './list_item_container';
import ListItemForm from './list_item_form_container';

class ListShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {updateListFormStatus: "Closed",
                  listName: "",
                  userSearch: "",
                  list_id: this.props.params.listid};
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.updateSearchParams = this.updateSearchParams.bind(this);
    this.handleSearchAdd = this.handleSearchAdd.bind(this);
  }

  componentDidMount() {
    const listId = this.props.params.listid;
    this.props.fetchList(listId);
    this.props.fetchListItems({type:"List", id: listId});
    this.props.fetchUsers({id: listId});
    if (this.props.list) {
      this.setState({listName: this.props.list.name});
    }

    if (!this.includesCurrentUser()) {
      hashHistory.push('/');
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.params.listid !== this.props.params.listid) {
      const listId = newProps.params.listid;
      this.props.fetchList(listId);
      this.props.fetchListItems({id: listId});
      this.props.fetchUsers({id: listId});
    }
    if (newProps.list) {
      this.setState({listName: newProps.list.name});
    if (!this.includesCurrentUser()) {
      hashHistory.push('/');
    }
    }
  }

  includesCurrentUser() {
    for (let i = 0; i < this.props.users.length; i++){
      if (this.props.users[i].id === this.props.currentUser.id) {
        return true;
      }
    }
    return false;
  }

  name (name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleUpdate(e) {
    e.preventDefault();
    this.props.updateList({id: this.props.params.listid,
                          name: this.state.listName});
    this.setState({updateListFormStatus: "Closed"});
  }

  updateSearchParams(event) {
    this.setState({userSearch:event.currentTarget.value});
    this.handleSearch(event.currentTarget.value);
  }

  handleSearch(results) {
    this.props.fetchSearchResults({type: "search",
      username: results});
  }

  listDetails() {
    if (this.state.updateListFormStatus === "Closed") {
      return (
        <div className="list-details">
          <h1>{this.name(this.state.listName)}</h1>
          <a onClick={ () => this.setState({updateListFormStatus: "Open"}) }>
            Edit
          </a>
          <form className="search-users">
            <input type="text"
              className="add-user-field"
              placeholder="Add User"
              value={this.state.userSearch}
              onChange={this.updateSearchParams} />
            {this.searchResults()}
          </form>
        </div>
      );
    } else {
      return (
          <form onSubmit={this.handleUpdate} className="list-details">
            <input type="text"
              className="update-list-name"
              placeholder="List Name"
              value={this.state.listName}
              onChange={this.update("listName")} />
            <input className="list-form-update" type="submit" value="Update" />
          </form>
      );
    }
  }

  handleSearchAdd(userId) {
    this.props.createAssociation({user_id: userId, list_id:this.state.list_id});
    this.props.fetchUsers({id: this.state.list_id});
    this.setState({userSearch: ""});
    this.handleSearch("");
  }

  searchResults() {
    if (this.props.searchResults.length !== 0) {
      return (
        <ul>
          {
            this.props.searchResults.map(result => (
              <li className="search-result-item"
                  key={result.id}
                  onClick={() => this.handleSearchAdd(result.id)}>
                {result.username}
                <a className="user-add-button">Add</a>
              </li>
            ))
          }
        </ul>
      );
    }
  }

  render () {
    const list = this.props.list;
    if (!list) {
      return <div>Loading...</div>;
    }
    return (
      <div className="list-show-page">
        <ListIndex className="list-index-component"/>
        <div className="list-show">
          {this.listDetails()}
          <ListItemForm formType="Add"
            listId={this.props.params.listid}
            action={this.props.createListItem}/>
          <ul>
            {
              this.props.listItems.map(listItem => (
                  <ListItem
                    key={listItem.id}
                    listItem={listItem}
                    itemType="list" />
                )
              )
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default ListShow;
