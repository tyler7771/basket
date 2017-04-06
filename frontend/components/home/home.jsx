import React from 'react';
import MediaQuery from 'react-responsive';
import { hashHistory, withRouter, Link } from 'react-router';
import ListIndex from '../lists/list_index_container';
import UserItems from '../lists/user_items_container';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {type: "button"};
    this.handleGuestLogin = this.handleGuestLogin.bind(this);
  }

  handleGuestLogin(e) {
    e.preventDefault();
    this.props.login({user: {username: "guest", password: "password"}});
  }

  handleSignup(e) {
    e.preventDefault();
    return (
      <SessionForm formType = "signup" action={this.props.signup}/>
    );
  }

  handleLogin(e) {
    e.preventDefault();
    return (
      <SessionForm formType = "Log in" action={this.props.login}/>
    );
  }

  handleButton(e, type) {
    e.preventDefault();
    if (type === "guest") {
      this.props.login({user: {username: "guest", password: "password"}});
    } else if (type === "signup") {
      if (!this.props.currentUser) {
        this.setState({type: "signup"});
      } else {
        hashHistory.push("/");
      }
    } else {
      if (!this.props.currentUser) {
        this.setState({type: "login"});
      } else {
        hashHistory.push("/");
      }
    }
  }

  render () {
    return (
      <div className="welcome-page">
        <MediaQuery query='(max-device-width: 1224px)'>
          <ListIndex type="mobile" />
        </MediaQuery>
        <MediaQuery query='(min-device-width: 1224px)'>
          <ListIndex />
          <UserItems />
        </MediaQuery>
      </div>
    );
  }
}

export default Home;
