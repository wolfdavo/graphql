import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'


//Components
import Booklist from './components/BookList'

//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
    <div id="main" className="App">
      <h1>Yep, another react app :)</h1>
      <Booklist/>
    </div>
    </ApolloProvider>
  );
}

export default App;
