import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DiceRoller from './DiceRoller';
import defaultUserImage from '../img/default_user_image.png';
import d20 from '../img/d20.png';

import CharacterSheet from './CharacterSheet/CharacterSheet';

class Chatroom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			chatInput: '',
			chatHistory: [],
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.appendMessage = this.appendMessage.bind(this);
		this.handleDiceRoll = this.handleDiceRoll.bind(this);
	}

	//lifecycle methods
	componentDidMount() {
		if (this.props.match.params.chatroomKey) {
			console.log(`parameters: ${this.props.match.params.chatroomKey}`);
		}
		this.props.enterChatroom(this.props.match.params.chatroomKey);
		this.props.addChatMessageHandler(this.appendMessage);
		this.props.addChatroomErrorListener((errorMessage) => {
			// update main error?
			console.log(errorMessage);
			this.props.history.push('/');
			this.props.updateError(errorMessage);
		});
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
		this.props.removeChatroomErrorListener();
		this.props.exitChatroom(this.props.match.params.chatroomKey);
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
				message: this.state.chatInput,
			};
			this.props.emitChatMessage(messageData);
			this.setState({ chatInput: '' });
		}
	}

	//emit result of dice roll from DiceRoller
	handleDiceRoll(rollData) {
		if (this.props.currentChatroom) {
			const modifier = rollData.modifier > 0 ? ` + ${rollData.modifier}` : '';
			const messageData = {
				type: 'dice roll',
				chatroomName: this.props.currentChatroom.name,
				message: `${rollData.rolls.length}${rollData.dieType}${modifier}: (${rollData.rolls}) Total = ${rollData.total} `,
			};
			this.props.emitChatMessage(messageData);
		}
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
			<div className="chatroom">
				<div className="chatroom__sidebar">
					<CharacterSheet
						version="chat"
						user={this.props.user}
						updateUser={this.props.updateUser}
						requestInProgress={this.props.requestInProgress}
						changeRequestInProgress={this.props.changeRequestInProgress}
					/>
					<DiceRoller handleDiceRoll={this.handleDiceRoll} />
				</div>
				<div className="chatroom__chat">
					<div className="chatName">
						<h4 className="heading--4">
							{this.props.currentChatroom ? this.props.currentChatroom.name : ''}
						</h4>
					</div>
					<div className="chatDisplay" ref={(node) => (this.node = node)}>
						{this.state.chatHistory.map((message, i) => {
							if (message.type === 'user message') {
								return (
									<div className="chatDisplay__messageBlock">
										<img
											src={defaultUserImage}
											alt="test"
											className="chatDisplay__userImage"
										/>
										<div className="chatDisplay__timestampMessage">
											<div
												key={i}
												className="chatDisplay__message chatDisplay__messageHeader"
											>
												{`${message.username} - ${message.timestamp}`}
											</div>
											<div className="chatDisplay__separator"></div>
											<div
												key={i}
												className="chatDisplay__message chatDisplay__message--userMessage"
											>
												{`${message.message}`}
											</div>
										</div>
									</div>
								);
							} else if (message.type === 'dice roll') {
								return (
									<div className="chatDisplay__messageBlock">
										<img
											src={defaultUserImage}
											alt="test"
											className="chatDisplay__userImage"
										/>
										<div className="chatDisplay__timestampMessage">
											<div
												key={i}
												className="chatDisplay__message chatDisplay__messageHeader"
											>
												{`${message.username} - ${message.timestamp}`}
											</div>
											<div className="chatDisplay__separator"></div>
											<div
												key={i}
												className="chatDisplay__message chatDisplay__message--diceRoll"
											>
												<img
													src={d20}
													alt="test"
													className="chatDisplay__dieImage"
												/>
												{`${message.message}`}
											</div>
										</div>
									</div>
								);
							} else if (message.type === 'chat notification') {
								return (
									<div
										key={i}
										className="chatDisplay__message chatDisplay__message--notification"
									>{`${message.username} ${message.message}`}</div>
								);
							} else {
								return (
									<div
										key={i}
										className="chatDisplay__message"
									>{`${message.username}: ${message.message}`}</div>
								);
							}
						})}
					</div>
					<form className="chatBar" onSubmit={this.handleSubmit}>
						<input
							autoFocus
							value={this.state.chatInput}
							onChange={this.handleChange}
							maxLength="400"
							type="text"
							className="input chatBar__input"
						/>
						<div className="chatBar__button">
							<button className="btn btn--dark" type="submit">
								Send
							</button>
						</div>
					</form>
				</div>
				<div className="userList">
					<h4 className="userList__userCount heading--4">
						Users{' '}
						{this.props.currentChatroom &&
							this.props.currentChatroom.userList &&
							this.props.currentChatroom.userList.length}
					</h4>
					{this.props.currentChatroom &&
						this.props.currentChatroom.userList &&
						this.props.currentChatroom.userList.map((user, index) => {
							return (
								<div className="userList__usersBlock">
									<img
										src={defaultUserImage}
										alt="test"
										className="userList__userImage"
									/>
									<div className="userList__users" key={index}>
										{user}
									</div>
								</div>
							);
						})}
				</div>
			</div>
		);
	}
}

export default withRouter(Chatroom);
