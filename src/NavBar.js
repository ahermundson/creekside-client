/* eslint-disable react/prop-types */

import _ from 'lodash';
import React, { Component } from 'react';
import { Container, Icon, Menu, Sidebar, Responsive } from 'semantic-ui-react';
import LoginLogout from './components/LoginLogout';

const NavBarMobile = ({
  children,
  leftItems,
  onPusherClick,
  onToggle,
  rightItems,
  visible
}) => (
  <Sidebar.Pushable>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      items={leftItems}
      vertical
      visible={visible}
    />
    <Sidebar.Pusher
      dimmed={visible}
      onClick={onPusherClick}
      style={{ minHeight: '100vh' }}
    >
      <Menu fixed="top" inverted style={{ backgroundColor: '#630012' }}>
        <Menu.Item>C</Menu.Item>
        <Menu.Item onClick={onToggle}>
          <Icon name="sidebar" />
        </Menu.Item>
        <LoginLogout.LoggedOut>
          <Menu.Menu position="right">
            {_.map(rightItems, item => <Menu.Item {...item} />)}
          </Menu.Menu>
        </LoginLogout.LoggedOut>
        <LoginLogout.LoggedIn>
          <Menu.Menu position="right">
            <Menu.Item content="Logout" />
          </Menu.Menu>
        </LoginLogout.LoggedIn>
      </Menu>
      {children}
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

const NavBarDesktop = ({ leftItems, rightItems }) => (
  <Menu
    style={{ backgroundColor: '#630012', color: 'white' }}
    fixed="top"
    inverted
    pointing
    secondary
  >
    <Menu.Item>Creekside Lawn and Landscape</Menu.Item>
    {_.map(leftItems, item => <Menu.Item {...item} />)}
    <LoginLogout
      render={({ isAuthenticated }) =>
        isAuthenticated ? (
          <Menu.Menu style={{ justifyContent: 'flex-end' }} position="right">
            <Menu.Item content="Logout" />
          </Menu.Menu>
        ) : (
          <Menu.Menu style={{ justifyContent: 'flex-end' }} position="right">
            {_.map(rightItems, item => <Menu.Item {...item} />)}
          </Menu.Menu>
        )
      }
    />
    {/* <LoginLogout.LoggedOut>
      <Menu.Menu position="right">
        {_.map(rightItems, item => <Menu.Item {...item} />)}
      </Menu.Menu>
    </LoginLogout.LoggedOut>
    <LoginLogout.LoggedIn>
      <Menu.Menu position="right">
        <Menu.Item content="Logout" />
      </Menu.Menu>
    </LoginLogout.LoggedIn> */}
  </Menu>
);

const NavBarChildren = ({ children }) => (
  <Container style={{ marginTop: '5em' }}>{children}</Container>
);

class NavBar extends Component {
  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  handleToggle = () =>
    this.setState(currentState => ({
      visible: !currentState.visible
    }));

  render() {
    const { children, leftItems, rightItems } = this.props;
    const { visible } = this.state;

    return (
      <div>
        <Responsive {...Responsive.onlyMobile}>
          <NavBarMobile
            leftItems={leftItems}
            onPusherClick={this.handlePusher}
            onToggle={this.handleToggle}
            rightItems={rightItems}
            visible={visible}
          >
            <NavBarChildren>{children}</NavBarChildren>
          </NavBarMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
          <NavBarDesktop leftItems={leftItems} rightItems={rightItems} />
          <NavBarChildren>{children}</NavBarChildren>
        </Responsive>
      </div>
    );
  }
}

export default NavBar;
