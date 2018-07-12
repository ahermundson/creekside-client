/* eslint-disable */

import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const AuthContext = React.createContext();
const history = createHistory({ forceRefresh: true });

class AuthContextComponent extends React.Component {
  isAuthenticated = () => {
    const { isAuthenticated } = this.state;
    return isAuthenticated;
  };

  login = async () => {
    console.log(this.props);
    const { email, password } = this.state;
    const { mutate } = this.props;
    const response = await mutate({
      variables: { email, password }
    });
    const { ok, token, refreshToken, errors, user } = response.data.login;
    if (ok) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      this.setState({ isAuthenticated: true, user });
      history.push('/timeclock');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message;
      });
      const { passwordError, emailError } = err;
      const errorList = [];
      if (passwordError) {
        errorList.push(passwordError);
      }
      if (emailError) {
        errorList.push(emailError);
      }
      console.log(errorList);
      this.setState({
        errorList
      });
    }
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  state = {
    isAuthenticated: true,
    user: {},
    errorList: null,
    login: this.login,
    email: '',
    password: '',
    onChange: this.onChange
  };

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      user {
        _id
      }
      errors {
        path
        message
      }
    }
  }
`;

export const AuthConsumer = AuthContext.Consumer;

export const AuthContextWithGraphql = graphql(loginMutation)(
  AuthContextComponent
);
