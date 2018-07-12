import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'semantic-ui-css/semantic.min.css';
import './content/semantic-override.css';
import Routes from './routes';
import NavBar from './NavBar';
import registerServiceWorker from './registerServiceWorker';

const httpLink = createHttpLink({ uri: 'http://localhost:3001/graphql' });
const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'x-token': localStorage.getItem('token') || null,
      'x-refresh-token': localStorage.getItem('refreshToken') || null
    }
  });
  return forward(operation);
});

const linkWithMiddleware = concat(middlewareLink, httpLink);

const refreshTokens = new ApolloLink((operation, forward) =>
  forward(operation).map(response => {
    const context = operation.getContext();
    const {
      response: { headers }
    } = context;
    const token = headers.get('x-token');
    const refreshToken = headers.get('x-refresh-token');

    if (token) {
      localStorage.setItem('token', token);
    }

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }

    return response;
  })
);

const link = concat(refreshTokens, linkWithMiddleware);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const leftItems = [
  {
    as: 'a',
    content: 'Home',
    key: 'home',
    active: true
  }
];
const rightItems = [
  { as: 'a', content: 'Login', key: 'login' },
  { as: 'a', content: 'Register', key: 'register' }
];

const App = () => (
  <ApolloProvider client={client}>
    <NavBar leftItems={leftItems} rightItems={rightItems}>
      <Routes />
    </NavBar>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
