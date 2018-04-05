import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { signupMutation } from '../../mutations/mutations';
import { currentUserQuery } from '../../queries/queries';
import AuthForm from './AuthForm';

class SignupForm extends Component {
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
        <h3>Signup</h3>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

SignupForm.propTypes = {
  data: PropTypes.object.isRequired,
  mutate: PropTypes.func.isRequired,
};

export default graphql(currentUserQuery)(
  graphql(signupMutation)(withRouter(SignupForm))
);
