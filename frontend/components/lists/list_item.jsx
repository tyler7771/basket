import React from 'react';
import { Link, hashHistory } from 'react-router';

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { id: this.props.listItem.id,
                  name: this.props.listItem.name,
                  purchased: this.props.listItem.purchased,
                  quantity: this.props.listItem.quantity,
                  user_id: this.props.listItem.user_id,
                  updateItemFormStatus: "Closed"};
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.itemPurchased = this.itemPurchased.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteListItem(this.props.listItem.id);
  }

  handleUpdate(type) {
    let item = this.state;
    if (type === "purchased") {
      item.purchased = !this.state.purchased;
    }
    this.props.updateListItem(item);
    this.setState({updateItemFormStatus: "Closed"});
  }

  name (name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  itemPurchased() {
    if (this.state.purchased === false) {
      return (
        <button className="item-not-purchased"
          onClick={() => this.handleUpdate("purchased")}>
          Buy
        </button>
      );
    } else {
      return (
        <button className="item-purchased"
          onClick={() => this.handleUpdate("purchased")}>
          Purchased
        </button>
      );
    }
  }

  updateListItemForm() {
    return(
      <form onSubmit={this.handleUpdate("update")} className="new-item-form">
        <input type="text"
          className="new-item-name"
          placeholder="Item Name"
          value={this.state.name}
          onChange={this.update("name")} />
        <select
          className="new-item-user"
          value={this.state.user_id}
          onChange={this.update("user_id")}>
          <option value="">User</option>
          {
            this.props.users.map(user => (
              <option key={user.id}
                value={user.id}>{user.username}
              </option>
            ))
          }
        </select>
        <input type="text"
          className="new-item-quantity"
          placeholder="Quantity"
          value={this.state.quantity}
          onChange={this.update("quantity")} />
        <input className="new-item-form-submit" type="submit" value="Update" />
      </form>
    );
  }

  render () {
    if (!this.props.listItem) {
      return <div>Loading...</div>;
    } else {
      return (
        <li className="list-item">
          {this.itemPurchased()}
          <p className="list-item-quantity">{this.props.listItem.quantity}</p>
          <h2 className="list-item-title">{this.name(this.props.listItem.name)}</h2>
          <img onClick={this.handleDelete} className="list-item-delete" src="/assets/trash_can.png" />
        </li>
      );
    }
  }
}

export default ListItem;
