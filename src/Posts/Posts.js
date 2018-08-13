import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

export default class Posts extends Component {
  render() {
    return (
      <div>
        <Link to={"/post/new"}>New Post</Link>
        {/* the Query thing is where we actualy use our query. this comes from
        Apollo 
        the function to pull the posts from the query is a render
        props function */}
        <ul>
          <Query query={POSTS_QUERY}>
            {({ loading, data, fetchMore }) => {
              // gives us a loading state from apollo
              if (loading) return "Loading...";
              // destructure posts from data.posts from our query
              const { posts } = data;
              // give me the title for all posts
              return (
                <React.Fragment>
                  {posts.map(post => (
                    <li key={post.id}>
                      <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={() =>
                        fetchMore({
                          variables: {
                            skip: posts.length
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                              posts: [...prev.posts, ...fetchMoreResult.posts]
                            });
                          }
                        })
                      }
                    >
                      Load More
                    </button>
                  </li>
                </React.Fragment>
              );
            }}
          </Query>
        </ul>
      </div>
    );
  }
}

// this is a query to grap all posts, all caps and underscore is naming best practice
const POSTS_QUERY = gql`
  query allPosts($skip: Int) {
    posts(orderBy: createdAt_DESC, first: 10, skip: $skip) {
      id
      title
      body
    }
  }
`;
