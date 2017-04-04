import React from 'react';
import { Link } from 'react-router';
import ListItemForm from './list_item_form_container';

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {updateItemFormStatus: "Closed",
      purchased: this.props.listItem.purchased,
      currentUserIncluded: ""};
    this.handleDelete = this.handleDelete.bind(this);
    this.itemPurchased = this.itemPurchased.bind(this);
    this.closeUpdateForm = this.closeUpdateForm.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers({id: this.props.listItem.list_id});
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteListItem(this.props.listItem.id);
  }

  handlePurchased(type) {
    let item = this.state;
    item.id = this.props.listItem.id;
    item.purchased = !this.state.purchased;
    this.props.updateListItem(item);
  }

  name (name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  itemPurchased() {
    if (this.state.purchased === false) {
      return (
        <button className="item-not-purchased"
          onClick={() => this.handlePurchased()}>
          Buy
        </button>
      );
    } else {
      return (
        <button className="item-purchased"
          onClick={() => this.handlePurchased()}>
          Purchased
        </button>
      );
    }
  }

  listAssociation() {
    if (this.props.listItem.user_id && this.props.itemType === "list") {
      return (
        <div className="list-item-association-info">
          <p>Assigned to:</p>
          <p>{this.props.listItem.user.username}</p>
        </div>
      );
    } else if (this.props.itemType === "user") {
      return (
        <div className="list-item-association-info">
          <p>Assigned to List:</p>
          <p>{this.props.listItem.list.name}</p>
        </div>
      );
    }
  }

  includesCurrentUser() {
    for (let i = 0; i < this.props.users.length; i++){
      if (this.props.users[i].id === this.props.currentUserId) {
        this.setState({currentUserIncluded: true});
      }
    }
    this.setState({currentUserIncluded: false});
  }

  display() {
    const listItem = this.props.listItem;
    if (this.state.updateItemFormStatus === "Closed" && this.props.itemType === "list") {
      return (
        <div className="list-item">
          {this.itemPurchased()}
          <p className="list-item-quantity">{listItem.quantity}</p>
          <h2 className="list-item-title">{this.name(listItem.name)}</h2>
          <img onClick={this.handleDelete}
            className="list-item-delete"
            src="/assets/trash_can.png" />
          <a onClick={() => this.setState({updateItemFormStatus: "Open"})}>
            Edit
          </a>
          {this.listAssociation()}
        </div>
      );
    } else if (this.props.itemType === "user") {
      return (
        <div className="list-item">
          {this.itemPurchased()}
          <p className="list-item-quantity">{listItem.quantity}</p>
          <h2 className="list-item-title">{this.name(listItem.name)}</h2>
          {this.listAssociation()}
        </div>
      );
    } else {
      return (
        <div className="list-item-form">
          <ListItemForm formType="Update"
            listItem={this.props.listItem}
            listId={this.props.listItem.list_id}
            closeUpdateForm={this.closeUpdateForm}
            action={this.props.updateListItem}/>
        </div>
      );
    }
  }

  closeUpdateForm() {
    this.setState({updateItemFormStatus: "Closed"});
  }

  render () {
    if (!this.props.listItem) {
      return <div>Loading...</div>;
    } else {
      return (
        <li>
          {this.display()}
        </li>
      );
    }
  }
}

export default ListItem;