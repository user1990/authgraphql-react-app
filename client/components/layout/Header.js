import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { currentUserQuery } from '../../queries/queries';
import { logoutMutation } from '../../mutations/mutations';

class Header extends Component {
  handleLogout = () => {
    this.props.mutate({
      refetchQueries: [{ query: currentUserQuery }],
    });
  };

  renderButtons() {
    const { loading, user } = this.props.data;

    if (loading) {
      return <div />;
    }

    if (user) {
      return (
        <li>
          <a
            role="button"
            tabIndex="0"
            onClick={this.handleLogout}
            onKeyPress={this.handleLogout}
          >
            Logout
          </a>
        </li>
      );
    }
    return (
      <div>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </div>
    );
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  data: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
};

export default graphql(logoutMutation)(graphql(currentUserQuery)(Header));
