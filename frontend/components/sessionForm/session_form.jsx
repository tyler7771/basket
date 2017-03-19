import React from 'react';
import { Link, withRouter } from 'react-router';

class SessionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      email: "",
			username: "",
			password: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderErrors = this.renderErrors.bind(this);
	}

	componentDidUpdate() {
		this.redirectIfLoggedIn();
	}

	componentWillReceiveProps(newProps) {
	}

	redirectIfLoggedIn() {
		if (this.props.loggedIn) {
			this.props.router.push("/");
		}
	}

	update(field) {
		return e => this.setState({
			[field]: e.currentTarget.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = this.state;
		this.props.action({user});
	}

	renderErrors() {
		if (this.props.errors) {
			return(
				<ul className="welcome-errors">
					{this.props.errors.map((error, i) => (
						<li key={`error-${i}`}>
							{error}
						</li>
					))}
				</ul>
			);
		}
	}

  handleForm(type) {
    if (type === "Sign up") {
      return (
        <input type="text"
          className="login-field"
          placeholder="email"
          value={this.state.email}
          onChange={this.update("email")}
          className="login-input" />
      );
    }
  }

	render() {
    const type = this.props.formType.formType;
		return (
			<div className="login-form-container">
				{this.renderErrors()}
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <div className="login-form">
            {this.handleForm(type)}
            <input type="text"
              className="login-field"
              placeholder="username"
              value={this.state.username}
              onChange={this.update("username")}
              className="login-input" />
            <input type="password"
              className="login-field"
              placeholder="password"
              value={this.state.password}
              onChange={this.update("password")}
              className="login-input" />
            <input type="submit" value={type} />
          </div>
        </form>
			</div>
		);
	}

}

export default withRouter(SessionForm);
