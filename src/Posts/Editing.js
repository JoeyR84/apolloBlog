import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";

export default class Editing extends Component {
  render() {
    const { isEditing } = this.props;
    return (
      <ApolloConsumer>
        {client => (
          <button
            onClick={() => {
              client.writeData({ data: { isEditing: !isEditing } });
            }}
          >
            Toggle Edit
          </button>
        )}
      </ApolloConsumer>
    );
  }
}
