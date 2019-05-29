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
        <h1 id="header" className="display-4 mb-4">
          Create a chatroom
        </h1>
        <p className="lead center">Enter chatroom name</p>
        <p className="lead center">
          <input
            name="chatroomName"
            type="text"
            value={this.state.chatroomName}
            onChange={this.handleChange}
          />
        </p>
        <p className="text-center">
          <button className="btn btn-primary btn-lg center" onClick={this.handleCreate}>
            Create chatroom
          </button>
        </p>
      </div>
    );
  }
}

export default withRouter(Games);
