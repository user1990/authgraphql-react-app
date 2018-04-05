import gql from 'graphql-tag';

// Login
export const loginMutation = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      id
      email
    }
  }
`;

// Logout
export const logoutMutation = gql`
  mutation {
    logout {
      id
      email
    }
  }
`;

// Signup
export const signupMutation = gql`
  mutation Signup($email: String, $password: String) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`;
