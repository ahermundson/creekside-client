// eslint-disable no-shadow

import React, { Component } from 'react';
import { Grid, Form, Segment, Button, Select } from 'semantic-ui-react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

class TimeClock extends Component {
  static propTypes = {
    startTimeClock: PropTypes.func,
    getLocations: PropTypes.shape({
      location: PropTypes.bool
    }),
    stopTimeClock: PropTypes.func
  };

  static defaultProps = {
    startTimeClock: null,
    getLocations: null,
    stopTimeClock: null
  };

  state = {
    hasActiveTimeClock: null
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { hasActiveTimeClock } = prevState;
    const {
      loading,
      getActiveUserTimeClock
    } = nextProps.getActiveUserTimeClock;
    if (!loading && hasActiveTimeClock === null) {
      console.log(nextProps);
      return {
        hasActiveTimeClock: getActiveUserTimeClock.hasActiveTimeClock
      };
    }
    return null;
  }

  onPunchInClick = () => {
    const { startTimeClock } = this.props;
    startTimeClock({
      variables: {
        user_id: '5a7d19cfd4a36a055ffa5130',
        active_timeclock: true,
        punched_in: new Date()
      }
    })
      .then(() => {
        this.setState({
          hasActiveTimeClock: true
        });
      })
      .catch(err => console.log(err));
  };

  onPunchOutClick = () => {
    const { stopTimeClock } = this.props;
    stopTimeClock().then(() => {
      this.setState({
        hasActiveTimeClock: false
      });
    });
  };

  render() {
    const { hasActiveTimeClock } = this.state;
    const {
      getLocations: { loading, getLocations }
    } = this.props;
    return (
      <div className="login-form" style={{ height: '100%' }}>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size="large">
              <Segment stacked>
                {loading ? (
                  '...Loading'
                ) : (
                  <Select
                    placeholder="Select your location"
                    options={getLocations.map(location => ({
                      key: location._id,
                      text: `${location.type} - ${location.propertyName}`
                    }))}
                    style={{ marginBottom: '25px', width: '100%' }}
                  />
                )}
                {hasActiveTimeClock ? (
                  <Button
                    style={{ backgroundColor: '#630012', color: 'white' }}
                    onClick={this.onPunchOutClick}
                    fluid
                    size="large"
                  >
                    Punch Out
                  </Button>
                ) : (
                  <Button
                    style={{
                      backgroundColor: '#630012',
                      color: 'white'
                    }}
                    onClick={this.onPunchInClick}
                    fluid
                    size="large"
                  >
                    Punch In
                  </Button>
                )}
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const START_TIMECLOCK = gql`
  mutation startTimeClock(
    $punched_in: Date!
    $active_timeclock: Boolean!
    $user_id: ID!
  ) {
    startTimeClock(
      punched_in: $punched_in
      active_timeclock: $active_timeclock
      user_id: $user_id
    ) {
      ok
      timeclock {
        punched_in
      }
    }
  }
`;

export default compose(
  graphql(
    gql`
      {
        getLocations {
          _id
          propertyName
          type
        }
      }
    `,
    { name: 'getLocations' }
  ),
  graphql(
    gql`
      {
        getActiveUserTimeClock {
          hasActiveTimeClock
        }
      }
    `,
    {
      name: 'getActiveUserTimeClock'
    }
  ),
  graphql(START_TIMECLOCK, { name: 'startTimeClock' }),
  graphql(
    gql`
      mutation {
        stopTimeClock
      }
    `,
    { name: 'stopTimeClock' }
  )
)(TimeClock);
