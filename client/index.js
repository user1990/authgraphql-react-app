import React from 'react';
import ReactDOM from 'react-dom';

// React router
import { BrowserRouter, Route } from 'react-router-dom';
// GraphQL Apollo
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
// Componenets
import App from './components/App';
// Styles
import './styles/styles.css';

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
});

const Root = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Route component={App} />
    </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.querySelector('#root'));
