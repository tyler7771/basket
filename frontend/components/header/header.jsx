import React from 'react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  listReturnButton () {

  }

  render () {
    return (
      <header>
        <div className="header-content">
          <MediaQuery query='(max-device-width: 1224px)'>
            {this.listReturnButton()}
          </MediaQuery>
          <Link to="/" className="header-title">Basket</Link>
          <a onClick={this.props.logout} className="logout">Logout</a>
        </div>
      </header>
    );
  }
}

export default Header;
