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

  listAssociation(type) {
    if (this.props.listItem.user_id && this.props.itemType === "list") {
      return (
        <div className={type === "mobile" ?
           "list-item-association-mobile" : "list-item-association-info"}>
          <p>Assigned to:</p>
          <p>{this.name(this.props.listItem.user.username)}</p>
        </div>
      );
    } else if (this.props.itemType === "user") {
      return (
        <div className="list-item-association-info">
          <p>Assigned to List:</p>
          <Link to={`/list/${this.props.listItem.list.id}`}>
            {this.name(this.props.listItem.list.name)}
          </Link>
        </div>
      );
    }
  }

  titleDisplay(type){
    if (this.props.listItem.user_id) {
      return (
        <h2 className={type === "mobile" ?
           "list-item-title-assigned-mobile" : "list-item-title-assigned"}>
           {this.name(this.props.listItem.name)}
        </h2>
      );
    } else {
      return (
        <h2 className={type === "mobile" ?
           "list-item-title-mobile" : "list-item-title"}>
           {this.name(this.props.listItem.name)}
        </h2>
      );
    }
  }

  display() {
    const type = this.props.type;
    const listItem = this.props.listItem;
    if (this.state.updateItemFormStatus === "Closed" && this.props.itemType === "list") {
      return (
        <div className={type === "mobile" ? "list-item-mobile" : "list-item"}>
          <div className={type === "mobile" ?
            "list-item-details-mobile" : "list-item-details"}>
            {this.itemPurchased()}
            <p className={type === "mobile" ?
               "list-item-quantity-mobile" : "list-item-quantity"}>
               {listItem.quantity}
            </p>
            {this.titleDisplay(type)}
          </div>
          <div className={type === "mobile" ?
            "list-item-buttons-mobile" : "list-item-buttons"}>
            <img onClick={this.handleDelete}
              className={type === "mobile" ?
                "list-item-delete-mobile" : "list-item-delete"}
              src="/assets/trash_can.png" />
            <a className={type === "mobile" ? "list-item-edit-mobile" : ""}
              onClick={() => this.setState({updateItemFormStatus: "Open"})}>
              Edit
            </a>
          </div>
          {this.listAssociation(type)}
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
