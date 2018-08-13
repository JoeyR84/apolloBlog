import React, { Component } from "react";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import "./App.css";
import Post from "./Posts/Post";
import Posts from "./Posts/Posts";
import NewPost from "./Posts/NewPost";

// here we use our query (outside of react) as a promise to get an array or posts
// client
//   .query({
//     query: testQuery
//   })
//   .then(res => console.log(res));

// ApolloProvider attaches the client to our app
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to={"/"}>
              <h1 className="App-title">GraphQL + Apollo Blog</h1>
            </Link>
          </header>
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route exact path="/post/new" component={NewPost} />
            <Route path="/post/:id" component={Post} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
