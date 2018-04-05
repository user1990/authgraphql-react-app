import React, { Component } from 'react';

import PropTypes from 'prop-types';

class AuthForm extends Component {
  state = {
    email: '',
    password: '',
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleAuthFormSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
  };

  render() {
    const { errors } = this.props;
    const { email, password } = this.state;

    return (
      <form onSubmit={this.handleAuthFormSubmit} className="col s6">
        <div className="input-field">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={this.handleEmailChange}
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={this.handlePasswordChange}
          />
        </div>
        <div className="errors">
          {errors.map(error => <div key={error}>{error}</div>)}
        </div>
        <button className="btn">Submit</button>
      </form>
    );
  }
}

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default AuthForm;
