import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isAuthenticated from '../Utils/IsAuthenticated';

export default class LoginLogout extends Component {
  static propTypes = {
    render: PropTypes.func.isRequired
  };

  state = {
    user: {},
    isAuthenticated: false
  };

  componentDidMount() {
    const authResponse = isAuthenticated();
    if (authResponse) {
      const { user } =
        authResponse.decodedToken || authResponse.decodedRefreshToken;
      this.setState({
        isAuthenticated: true,
        user
      });
    }
  }

  render() {
    const { render } = this.props;
    return <div style={{ width: '100%' }}>{render(this.state)}</div>;
  }
}

// Compound example
// export default class LoginLogout extends Component {
//   static LoggedOut = ({ children }) => (!isAuthenticated() ? children : null);

//   static LoggedIn = ({ children }) => (isAuthenticated() ? children : null);

//   render() {
//     const { children } = this.props; // eslint-disable-line
//     console.log(this.props);
//     return React.Children.map(children, child => React.cloneElement(child));
//   }
// }
