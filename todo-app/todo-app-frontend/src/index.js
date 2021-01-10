import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/App';

import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const url = process.env.REACT_APP_API_URL;

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allTodos: {
            merge(existing, incoming) {
              return incoming;
            }
          }
        }
      }
    }
  }),
  link: new HttpLink({
    uri: url
  })
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Main />
  </ApolloProvider>,
  document.getElementById('root')
);
