import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import currentUserQuery from '../../queries/queries';

export default WrappedComponent => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps) {
      if (!nextProps.data.loading && !nextProps.data.user) {
        nextProps.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(currentUserQuery)(withRouter(RequireAuth));
};
