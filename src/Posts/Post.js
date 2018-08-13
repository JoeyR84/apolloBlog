import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import UpdatePost from "./UpdatePost";
import Editing from "./Editing";

export default class Post extends Component {
  render() {
    const { match } = this.props;
    return (
      <Query
        query={POST_QUERY}
        variables={{
          id: match.params.id
        }}
      >
        {({ loading, data }) => {
          if (loading) return "Loading...";
          const { post, isEditing } = data;
          return (
            <div>
              <Editing isEditing={isEditing} />
              {isEditing ? (
                <section>
                  <h1>Edit Post</h1>
                  <UpdatePost post={post} />
                </section>
              ) : (
                <section>
                  <h1>{post.title}</h1>
                  <Mutation
                    mutation={NEW_POST}
                    variables={{
                      id: post.id,
                      check: !post.check
                    }}
                    // optimistically render the ui of the checkbox before the db responds
                    optimisticResponse={{
                      __typename: "Mutation",
                      updatePost: {
                        __typename: "Post",
                        check: !post.check
                      }
                    }}
                    update={(cache, { data: { updatePost } }) => {
                      const data = cache.readQuery({
                        query: POST_QUERY,
                        variables: {
                          id: post.id
                        }
                      });
                      data.post.check = updatePost.check;
                      cache.writeQuery({
                        query: POST_QUERY,
                        data: {
                          ...data,
                          post: data.post
                        }
                      });
                    }}
                  >
                    {updatePost => (
                      <input
                        type="checkbox"
                        checked={post.check}
                        onChange={updatePost}
                      />
                    )}
                  </Mutation>
                  <p>{post.body}</p>
                </section>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

const POST_QUERY = gql`
  query post($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      body
      check
    }
    isEditing @client
  }
`;

const NEW_POST = gql`
  mutation updatePost($check: Boolean, $id: ID!) {
    updatePost(where: { id: $id }, data: { check: $check }) {
      check
    }
  }
`;
