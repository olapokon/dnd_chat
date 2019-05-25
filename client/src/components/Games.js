import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
const uuidv4 = require('uuid/v4');

class Games extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatroomName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleCreate() {
    const newUuid = uuidv4();
    this.props.createChatroom(newUuid, this.state.chatroomName);
    this.props.history.push(`/${newUuid}`);
  }

  render() {
    return (
      <div id="games">
        <h2>Create chatroom</h2>
        <input
          name="chatroomName"
          type="text"
          value={this.state.chatroomName}
          onChange={this.handleChange}
        />
        <button type="button" onClick={this.handleCreate}>
          Create chatroom
        </button>
      </div>
    );
  }
}

export default withRouter(Games);
