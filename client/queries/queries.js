import gql from 'graphql-tag';

export const currentUserQuery = gql`
  {
    user {
      id
      email
    }
  }
`;
