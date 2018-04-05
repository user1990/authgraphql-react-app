import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { loginMutation } from '../../mutations/mutations';
import { currentUserQuery } from '../../queries/queries';
import AuthForm from './AuthForm';

class LoginForm extends Component {
  state = {
    errors: [],
  };

  componentWillUpdate(nextProps) {
    if (nextProps.data.user && !this.props.data.user) {
      nextProps.history.push('/dashboard');
    }
  }

  onSubmit = ({ email, password }) => {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query: currentUserQuery }],
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  };

  render() {
    return (
      <div className="container form">
        <h3>Login</h3>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

LoginForm.propTypes = {
  data: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
};

export default graphql(currentUserQuery)(
  graphql(loginMutation)(withRouter(LoginForm))
);
