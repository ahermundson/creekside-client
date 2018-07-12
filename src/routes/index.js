import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import TimeClock from './TimeClock';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import isAuthenticated from '../Utils/IsAuthenticated';
import { AuthContextWithGraphql } from '../components/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default () => (
  <AuthContextWithGraphql>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginForm} />
        <PrivateRoute path="/timeclock" exact component={TimeClock} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <Route path="/reset-password" exact component={ResetPassword} />
      </Switch>
    </BrowserRouter>
  </AuthContextWithGraphql>
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};

PrivateRoute.defaultProps = {
  location: {}
};
