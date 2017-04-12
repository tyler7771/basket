import React from 'react';
import { Link, hashHistory } from 'react-router';
import MediaQuery from 'react-responsive';
import ListIndex from './list_index_container';
import ListItem from './list_item_container';
import CommentIndex from './../comments/comment_index_container';
import ListItemForm from './list_item_form_container';

class ListShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {updateListFormStatus: "Closed",
                  commentFormStatus: "Closed",
                  listName: "",
                  userSearch: "",
                  list_id: this.props.params.listid,
                  emails: ""};
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.updateSearchParams = this.updateSearchParams.bind(this);
    this.handleSearchAdd = this.handleSearchAdd.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  componentDidMount() {
    const listId = this.props.params.listid;
    this.props.fetchList(listId);
    this.props.fetchListItems({type:"List", id: listId});
    this.props.fetchComments({id: listId});
    this.props.fetchUsers({id: listId});
    if (this.props.list) {
      this.handleEmail();
      this.setState({listName: this.props.list.name});
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.params.listid !== this.props.params.listid) {
      const listId = newProps.params.listid;
      this.props.fetchList(listId);
      this.props.fetchListItems({type: "List", id: listId});
      this.props.fetchComments({id: listId});
      this.props.fetchUsers({id: listId});
    }
    if (newProps.list) {
      this.handleEmail();
      this.setState({listName: newProps.list.name});
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

  listDetails(type) {
    if (this.state.updateListFormStatus === "Closed") {
      return (
        <div className={type === "mobile" ? "list-details-mobile" : "list-details"}>
          <h1>{this.name(this.state.listName)}</h1>
          <div className={type === "mobile" ? "edit-email-mobile" : "edit-email"}>
            <a className={type === "mobile" ? "email-button-mobile" : "email-button"}
              href={`mailto:${this.state.emails}?subject=Check Out Our List!&body=${window.location.href}`}>Email</a>
            <a className={type === "mobile" ? "email-button-mobile" : "email-button"}
              onClick={ () => this.setState({updateListFormStatus: "Open"}) }>
              Edit
            </a>
          </div>
          <form className={type === "mobile" ? "search-users-mobile" : "search-users"}>
            <input type="text"
              className={type === "mobile" ? "add-user-field-mobile" : "add-user-field"}
              placeholder="Add User"
              value={this.state.userSearch}
              onChange={this.updateSearchParams} />
            {this.searchResults(type)}
          </form>
        </div>
      );
    } else {
      return (
          <form onSubmit={this.handleUpdate}
            className={type === "mobile" ? "list-details-mobile" : "list-details"}>
            <input type="text"
              className={type === "mobile" ? "update-list-name-mobile" : "update-list-name"}
              placeholder="List Name"
              value={this.state.listName}
              onChange={this.update("listName")} />
            <input className={type === "mobile" ? "list-form-update-mobile" : "list-form-update"}
              type="submit" value="Update" />
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

  searchResults(type) {
    if (this.props.searchResults.length !== 0) {
      return (
        <ul>
          {
            this.props.searchResults.map(result => (
              <li className={type === "mobile" ? "search-result-item-mobile" : "search-result-item"}
                  key={result.id}
                  onClick={() => this.handleSearchAdd(result.id)}>
                <p>{result.username}</p>
                <a className={type === "mobile" ? "user-add-button-mobile" : "user-add-button"}>Add</a>
              </li>
            ))
          }
        </ul>
      );
    }
  }

  handleEmail() {
    const emailArray = [];

    this.props.users.map(user => (
      emailArray.push(user.email)
      )
    );
    const emails = emailArray.join(';');
    this.setState({emails: emails});
  }

  mediaResults(type) {
    const list = this.props.list;
    if (!list) {
      return <div>Loading...</div>;
    }
    return (
      <div className={type === "mobile" ? "list-show-mobile" : "list-show"}>
        {this.listDetails(type)}
        <ListItemForm formType="Add"
          listId={this.props.params.listid}
          action={this.props.createListItem}
          type={type}/>
        <ul className={type === "mobile" ? "list-item-index-mobile" : "list-item-index"}>
          {
            this.props.listItems.map(listItem => (
              <ListItem
                key={listItem.id}
                listItem={listItem}
                itemType="list"
                type={type} />
              )
            )
          }
        </ul>
      </div>
    );
  }

  render () {
    return (
      <div className="list-show-page">
        <MediaQuery query='(min-device-width: 1224px)' className="desktop-size">
          <ListIndex className="list-index-component"/>
          {this.mediaResults("desktop")}
          <CommentIndex
            listid={this.props.params.listid}
            type={"desktop"} />
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          {this.mediaResults("mobile")}
          <CommentIndex
            listid={this.props.params.listid}
            type={"mobile"} />
        </MediaQuery>
      </div>
    );
  }
}

export default ListShow;
