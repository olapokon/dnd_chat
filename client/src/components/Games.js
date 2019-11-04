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

  handleCreate(event) {
    event.preventDefault();
    const newUuid = uuidv4();
    this.props.createChatroom(newUuid, this.state.chatroomName);
    this.props.history.push(`/chatroom/${newUuid}`);
  }

  render() {
    return (
      <form className="games">
        <h1 className="mainHeading mb--large">Create a chatroom</h1>
        <p className="center">Enter chatroom name</p>
        <p className="center">
          <input
            name="chatroomName"
            type="text"
            value={this.state.chatroomName}
            onChange={this.handleChange}
          />
        </p>
        <p className="center">
          <input
            className="btn--dark"
            type="submit"
            value="Create chatroom"
            onClick={this.handleCreate}
          />
        </p>
      </form>
    );
  }
}

export default withRouter(Games);
