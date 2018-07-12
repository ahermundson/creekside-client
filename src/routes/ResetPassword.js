import React, { Component } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import decode from 'jwt-decode';

class ResetPassword extends Component {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string
    }).isRequired,
    mutate: PropTypes.func,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  static defaultProps = {
    mutate: null
  };

  state = {
    newPassword: '',
    confirmPassword: '',
    resetPasswordError: false
  };

  componentDidMount() {
    const {
      location: { search }
    } = this.props;
    const params = queryString.parse(search);
    try {
      const token = decode(params.token);
      this.setState({
        id: token.user._id,
        token: params.token
      });
    } catch (err) {
      console.log(err);
    }
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onUpdatePasswordClick = () => {
    const { mutate, history } = this.props;
    const { newPassword, confirmPassword, id, token } = this.state;
    if (newPassword === confirmPassword) {
      mutate({
        variables: {
          _id: id,
          token,
          password: newPassword
        }
      })
        .then(() => history.push('/'))
        .catch(() => {
          this.setState({
            resetPasswordError: true
          });
        });
    }
  };

  render() {
    const { newPassword, confirmPassword, resetPasswordError } = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: '100%' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Form size="large">
            <Segment stacked>
              <h4 style={{ color: '#630012' }}>
                Enter the email associated with your account to reset
              </h4>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="New Password"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={this.onChange}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={this.onChange}
              />

              <Button
                style={{
                  backgroundColor: '#630012',
                  color: 'white',
                  marginBottom: '15px'
                }}
                onClick={this.onUpdatePasswordClick}
                fluid
                size="large"
              >
                Update Password
              </Button>
              {resetPasswordError && (
                <Message negative>
                  <Message.Header>
                    An error occured when updating your password.
                  </Message.Header>
                </Message>
              )}
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const updatePasswordMutation = gql`
  mutation($password: String!, $token: String!, $_id: ID!) {
    updatePassword(password: $password, token: $token, _id: $_id)
  }
`;

export default graphql(updatePasswordMutation)(ResetPassword);
