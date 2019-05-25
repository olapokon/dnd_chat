import React, { Component } from 'react';
import DiceRoller from './DiceRoller';
import './Chatroom.css';

import CharacterSheetChat from './CharacterSheet/CharacterSheetChat';

//validate input, prevent injected markup

class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatInput: '',
      chatHistory: []
    };
    this.scrollRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.appendMessage = this.appendMessage.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.handleDiceRoll = this.handleDiceRoll.bind(this);
  }

  //lifecycle methods
  componentDidMount() {
    this.props.enterChatroom(this.props.chatroomKey);
    console.log('chatroom component mount, chatroom name: ' + this.props.chatroomName);
    this.props.addChatMessageHandler(this.appendMessage);

    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    console.log('chatroom component unmount, chatroom name: ' + this.props.chatroomName);
    this.props.removeChatMessageHandler();
    this.props.exitChatroom(this.props.chatroomKey);
  }

  //other methods
  handleChange(event) {
    this.setState({ chatInput: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const messageData = {
      type: 'user message',
      chatroomName: this.props.chatroomName,
      message: this.state.chatInput
    };
    this.props.emitChatMessage(messageData);
    this.setState({ chatInput: '' });
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

  scrollToBottom() {
    this.scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    //ReactDOM.findDOMNode(this.scrollRef.current).scrollTop = ReactDOM.findDOMNode(this.scrollRef.current).scrollHeight;
    //this.scrollRef.current.scrollTop = this.scrollRef.current.scrollHeight;
  }

  render() {
    return (
      <div className="chatContainer">
        <div className="charSheet">
          <CharacterSheetChat user={this.props.user} updateUser={this.props.updateUser} />
        </div>

        <div className="chatroom">
          <h3>
            Chatroom: {this.props.chatroomName || 'Default chatroom'} User count:{' '}
            {this.props.userList.length}
          </h3>

          <div className="chatDisplay">
            <ul style={{ listStyleType: 'none' }}>
              {this.state.chatHistory.map((message, i) => {
                if (message.type === 'user message') {
                  return (
                    <li key={i}>
                      <div className="messageWrapper">
                        {/* <div class="icon">user icon</div>
                        <div class="username">username</div> */}
                        <div className="message">{`${message.username}: ${
                          message.message
                        }`}</div>
                      </div>
                    </li>
                  );
                } else if (message.type === 'dice roll') {
                  return (
                    <li key={i} style={{ color: 'blue' }}>{`${message.username} rolls ${
                      message.message
                    }.`}</li>
                  );
                } else if (message.type === 'chat notification') {
                  return (
                    <li key={i} style={{ color: 'orange' }}>{`${message.username} ${
                      message.message
                    }`}</li>
                  );
                } else {
                  return (
                    <li key={i}>
                      <div className="messageWrapper">
                        <div className="message">{`${message.username}: ${
                          message.message
                        }`}</div>
                      </div>
                    </li>
                  );
                }
              })}
            </ul>

            {/* reference for scrolling */}
            <div ref={this.scrollRef} />
          </div>
          <div className="sendBar">
            <form
              action=""
              style={{
                background: 'rgb(192, 248, 252)',
                padding: '3px',
                // position: 'fixed',
                // bottom: 0,
                width: '100%'
              }}
              onSubmit={this.handleSubmit}
            >
              <input
                value={this.state.chatInput}
                onChange={this.handleChange}
                style={{ border: 0, padding: '10px', width: '84%', marginRight: '.5%' }}
              />
              <button
                style={{
                  width: '12%',
                  background: 'rgb(130, 224, 255)',
                  border: 'none',
                  padding: '8px'
                }}
              >
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="diceRoller">
          <DiceRoller handleDiceRoll={this.handleDiceRoll} />
        </div>
      </div>
    );
  }
}

export default Chatroom;
