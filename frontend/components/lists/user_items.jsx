import React from 'react';
import { Link } from 'react-router';
import ListIndex from './list_index_container';
import ListItem from './list_item_container';
import ListItemForm from './list_item_form_container';

class UserItems extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.fetchListItems({type:"User"});
  }

  userItemsCheck() {
    if (this.props.listItems.length === 0) {
      return (<p className="no-items">You have no assigned items :(</p>);
    } else {
      return (
        <ul>
          {
            this.props.listItems.map(listItem => (
              <ListItem
                key={listItem.id}
                listItem={listItem}
                itemType="user" />
            )
          )
        }
      </ul>
    );
    }
  }

  render () {
    return (
        <div className="user-items-show">
          <div className="user-items-details">
            <h1>Your Assigned List Items</h1>
          </div>
          {this.userItemsCheck()}
        </div>
    );
  }
}

export default UserItems;
