import React from 'react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <MediaQuery query='(max-device-width: 1224px)'>
          <header className="mobile-header">
            <div className="header-content">
              <Link to="/" className="mobile-return-home">Home</Link>
              <Link to="/" className="mobile-header-title">Basket</Link>
              <a onClick={this.props.logout} className="mobile-logout">Logout</a>
            </div>
          </header>
        </MediaQuery>
        <MediaQuery query='(min-device-width: 1224px)'>
          <header>
            <div className="header-content">
              <Link to="/" className="header-title">Basket</Link>
              <a onClick={this.props.logout} className="logout">Logout</a>
            </div>
          </header>
        </MediaQuery>
      </div>
    );
  }
}

export default Header;
