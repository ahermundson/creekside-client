import React from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';

class ForgotPassword extends React.Component {
  state = {
    email: ''
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onForgotPasswordClick = () => {
    const { email } = this.state;
    fetch('http://localhost:3001/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        email
      })
    });
  };

  render() {
    const { email } = this.state;
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
                placeholder="E-mail address"
                name="email"
                value={email}
                onChange={this.onChange}
              />

              <Button
                style={{
                  backgroundColor: '#630012',
                  color: 'white',
                  marginBottom: '15px'
                }}
                onClick={this.onForgotPasswordClick}
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default ForgotPassword;
