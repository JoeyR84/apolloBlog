import React, { Component } from "react";
import PostForm from "./PostForm";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

export default class UpdatePost extends Component {
  render() {
    const { post } = this.props;
    return (
      <Mutation mutation={NEW_POST}>
        {(updatePost, result) => {
          const onSuccess = () =>
            result.client.writeData({ data: { isEditing: false } });
          return (
            <PostForm post={post} onSuccess={onSuccess} onSubmit={updatePost} />
          );
        }}
      </Mutation>
    );
  }
}

const NEW_POST = gql`
  mutation updatePost($id: ID!, $title: String!, $body: String!) {
    updatePost(
      where: { id: $id }
      data: { status: PUBLISHED, title: $title, body: $body }
    ) {
      title
      body
      id
    }
  }
`;
