/* eslint-disable class-methods-use-this prefer-stateless-function */

import React from 'react';
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../components/AuthContext';

const LoginForm = () => (
  <div className="login-form">
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    <style>
      {`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}{' '}
    </style>
    <AuthConsumer>
      {({ login, onChange, email, password, errorList }) => (
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  name="email"
                  value={email}
                  onChange={onChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                />

                <Button
                  style={{
                    backgroundColor: '#630012',
                    color: 'white',
                    marginBottom: '15px'
                  }}
                  onClick={login}
                  fluid
                  size="large"
                >
                  Login
                </Button>
                <Link
                  to="/forgot-password"
                  style={{
                    color: '#630012',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  Forgot password?
                </Link>
              </Segment>
            </Form>
            {errorList && (
              <Message
                error
                header="There was some errors with your submission"
                list={errorList}
              />
            )}
          </Grid.Column>
        </Grid>
      )}
    </AuthConsumer>
  </div>
);

export default LoginForm;
