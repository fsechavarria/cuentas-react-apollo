import gql from 'graphql-tag'

export const login = gql`
  query doLogin($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userId
      email
      role
    }
  }
`
