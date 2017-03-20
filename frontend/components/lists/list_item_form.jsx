import React from 'react';
import { Link } from 'react-router';
import ListIndex from './list_index_container';
import ListItem from './list_item_container';

class ListShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {name: "",
                  purchased: "",
                  quantity: "",
                  user_id: "",
                  list_id: ""};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers({id: this.props.listId});
    if (this.props.formType.formType === "Add") {
      this.setState({list_id: this.props.listId,
        purchased: false});
    } else {
      if (this.props.listItem) {
        if (this.props.formType.formType === "Update") {
          this.setState({name: this.props.listItem.name,
            purchased: this.props.listItem.purchased,
            quantity: this.props.listItem.quantity,
            user_id: this.props.listItem.user_id,
            list_id: this.props.listId});
        }
      }
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.listId !== this.props.listId) {
      if (this.props.formType.formType === "Add") {
        this.props.fetchUsers({id: newProps.listId});
        this.setState({list_id: this.props.listId,
          purchased: false});
      } else {
        if (this.props.listItem) {
          if (newProps.listItem.id !== this.props.listItem.id) {
            this.props.fetchUsers({id: newProps.listId});
          }
          this.setState({name: this.props.listItem.name,
            purchased: this.props.listItem.purchased,
            quantity: this.props.listItem.quantity,
            user_id: this.props.listItem.user_id,
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
    const item = this.state;
    if (this.props.formType.formType === "Update") {
      item.id = this.props.listItem.id;
    }
    if (item.quantity === "") {
      item.quantity = 1;
    } else {
      item.quantity = parseInt(item.quantity);
    }
    if (item.user_id !== "") {
      item.user_id = parseInt(item.user_id);
    }

    this.props.action(item);

    if (this.props.formType.formType === "Update") {
      this.props.closeUpdateForm();
    } else {
      this.setState({name: "", quantity: "", user_id: ""});
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit} className="new-item-form">
        <input type="text"
          className="new-item-name"
          placeholder="Item Name"
          value={this.state.name}
          onChange={this.update("name")} />
        <select
          className="new-item-user"
          value={this.state.user_id}
          onChange={this.update("user_id")}>
          <option>Assign to User</option>
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
        <input className="new-item-form-submit"
          type="submit"
          value={this.props.formType.formType} />
      </form>
    );
  }
}

export default ListShow;
