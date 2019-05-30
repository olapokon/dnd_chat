import React, { Component } from 'react';
import DiceRoller from './DiceRoller';
import './Chatroom.css';

import CharacterSheetChat from './CharacterSheet/CharacterSheetChat';

class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: '',
      chatHistory: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.appendMessage = this.appendMessage.bind(this);
    this.handleDiceRoll = this.handleDiceRoll.bind(this);
  }

  //lifecycle methods
  componentDidMount() {
    this.props.enterChatroom(this.props.chatroomKey);
    this.props.addChatMessageHandler(this.appendMessage);
  }

  componentWillUpdate() {
    const node = this.node;
    this.scrollHeightMinusClientBeforeUpdate = node.scrollHeight - node.clientHeight;
  }

  componentDidUpdate() {
    const node = this.node;
    if (this.scrollHeightMinusClientBeforeUpdate === node.scrollTop) {
      node.scrollTop = node.scrollHeight;
    }
  }

  componentWillUnmount() {
    this.props.removeChatMessageHandler();
    this.props.exitChatroom(this.props.chatroomKey);
  }

  //other methods
  handleChange(event) {
    this.setState({ chatInput: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.chatInput.trim()) {
      const messageData = {
        type: 'user message',
        chatroomName: this.props.chatroomName,
        message: this.state.chatInput
      };
      this.props.emitChatMessage(messageData);
      this.setState({ chatInput: '' });
    }
  }

  //emit result of dice roll from DiceRoller
  handleDiceRoll(rollData) {
    const modifier = rollData.modifier > 0 ? ` + ${rollData.modifier}` : '';
    const messageData = {
      type: 'dice roll',
      chatroomName: this.props.chatroomName,
      message: `${rollData.rolls.length}${rollData.dieType}${modifier}: ${rollData.total}`
    };
    this.props.emitChatMessage(messageData);
  }

  //messageData arriving is an object with 'username', 'type', and 'message' keys
  appendMessage(messageData) {
    if (!messageData.message) {
      return;
    }
    this.setState({ chatHistory: [...this.state.chatHistory, messageData] });
  }

  render() {
    return (
      <div className="chatroomSheetDiceChatContainer container-fluid px-0">
        <div className="row mx-0">
          <div className="col-sm-3">
            <div className="charSheet">
              <CharacterSheetChat user={this.props.user} updateUser={this.props.updateUser} />
            </div>
            <div className="diceRoller">
              <DiceRoller handleDiceRoll={this.handleDiceRoll} />
            </div>
          </div>
          <div className="chatContainer col-9">
            <div id="chatroomUsercount">
              <h3>
                Chatroom: {this.props.chatroomName || 'Default chatroom'} User count:{' '}
                {this.props.userList.length}
              </h3>
            </div>
            <div className="chatDisplay" ref={node => (this.node = node)}>
                {this.state.chatHistory.map((message, i) => {
                  if (message.type === 'user message') {
                    return (
                        <div key={i} className="messageWrapper">
                          <div className="message">{`${message.username}: ${message.message}`}</div>
                        </div>
                    );
                  } else if (message.type === 'dice roll') {
                    return (
                      <div key={i} className="message" style={{ color: 'blue' }}>{`${message.username} rolls ${
                        message.message
                      }.`}</div>
                    );
                  } else if (message.type === 'chat notification') {
                    return (
                      <div key={i} className="message" style={{ color: 'orange' }}>{`${message.username} ${
                        message.message
                      }`}</div>
                    );
                  } else {
                    return (
                        <div className="messageWrapper">
                          <div key={i} className="message">{`${message.username}: ${message.message}`}</div>
                        </div>
                    );
                  }
                })}
            </div>
            <form className="input-group mb-3" onSubmit={this.handleSubmit}>
              <input
                autoFocus
                value={this.state.chatInput}
                onChange={this.handleChange}
                maxLength="400"
                type="text"
                className="form-control"
                aria-describedby="button-addon2"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit" id="button-addon2">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Chatroom;
