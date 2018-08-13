import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const defaultState = {
  isEditing: false
};
//setting up the local cache
const cache = new InMemoryCache();

persistCache({
  cache,
  storage: window.localStorage
}).then(() => {
  // creating client to connect app to GraphQL API which is Graph CMS
  const client = new ApolloClient({
    cache,
    uri: "https://api-uswest.graphcms.com/v1/cjkjx0ylo05dn01dkd7kkylv5/master",
    // sets up local state in the cache. resolvers is there bc of a bug
    clientState: {
      defaults: defaultState,
      resolvers: {}
    }
  });

  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    document.getElementById("root")
  );
  registerServiceWorker();
});
