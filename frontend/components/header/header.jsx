import React from 'react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <header>
        <div className="header-content">
          <MediaQuery query='(max-device-width: 1224px)'>
            <Link to="/" className="return-home">Home</Link>
          </MediaQuery>
          <Link to="/" className="header-title">Basket</Link>
          <a onClick={this.props.logout} className="logout">Logout</a>
        </div>
      </header>
    );
  }
}

export default Header;
