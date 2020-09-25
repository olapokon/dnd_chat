import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

import InputError from './InputError';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			usernameError: false,
			usernameErrorMessage: '',
			passwordError: false,
			passwordErrorMessage: '',
			// socket: socket()
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleGithubLogin = this.handleGithubLogin.bind(this);
	}

	componentDidMount() {
		if (this.state.socket) {
			return;
		}
		this.setState(
			{
				socket: io(),
			},
			() => {
				this.state.socket.on('github login', (user) => {
					if (user.user) {
						this.popupWindow.close();
						this.state.socket.emit('close');
						this.props.changeRequestInProgress(false);
						this.props.updateUserAndOpenSocket(user.user);
						this.props.history.push('/');
					}
					if (user.error) {
						this.popupWindow.close();
						this.props.changeRequestInProgress(false);
						this.props.updateError(user.error);
					}
				});
			}
		);
	}

	componentDidUpdate() {
		// socket listening for a github login event from the server
		if (!this.state.socket) {
			return;
		}

		this.state.socket.off('github login');
		this.state.socket.on('github login', (user) => {
			if (user.user) {
				this.popupWindow.close();
				this.state.socket.emit('close');
				this.props.changeRequestInProgress(false);
				this.props.updateUserAndOpenSocket(user.user);
				this.props.history.push('/');
			}
			if (user.error) {
				this.popupWindow.close();
				this.props.changeRequestInProgress(false);
				this.props.updateError(user.error);
			}
		});
	}

	componentWillUnmount() {
		if (this.state.socket) {
			this.state.socket.emit('close');
		}
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	async handleSubmit(event) {
		event.preventDefault();
		if (this.props.requestInProgress) {
			return;
		}
		await this.setState({ usernameError: false, passwordError: false });

		if (!this.state.username.trim()) {
			this.setState({
				usernameError: true,
				usernameErrorMessage: 'Enter a valid username',
			});
			return;
		}
		if (!this.state.password.trim()) {
			this.setState({
				passwordError: true,
				passwordErrorMessage: 'Password cannot be blank',
			});
			return;
		}

		this.props.changeRequestInProgress(true);
		axios
			.post('/login', {
				username: this.state.username,
				password: this.state.password,
			})
			.then((res) => {
				if (res.data.authenticationError) {
					if (res.data.errorField === 'username') {
						this.setState({
							usernameError: true,
							usernameErrorMessage: res.data.authenticationError,
						});
					} else if (res.data.errorField === 'password') {
						this.setState({
							passwordError: true,
							passwordErrorMessage: res.data.authenticationError,
						});
					}
					this.props.changeRequestInProgress(false);
					throw new Error(res.data.authenticationError);
				}
				if (res.data.user) {
					this.props.changeRequestInProgress(false);
					this.props.updateUserAndOpenSocket(res.data.user);
				}
			})
			.then(() => {
				this.props.history.push('/');
			})
			.catch((error) => {
				console.log(error);
			});
	}

	handleGithubLogin(event) {
		event.preventDefault();
		if (this.props.requestInProgress) {
			return;
		}

		this.setState({ usernameError: false, passwordError: false });
		// this.props.changeRequestInProgress(true);
		console.log(this.state.socket.id);
		this.popupWindow = window.open(
			// for development, include the express localhost path http://localhost:3001/githubLogin etc
			// for production `/githubLogin?socketId=${this.state.socket.id}`
			`/githubLogin?socketId=${this.state.socket.id}`,
			// `http://localhost:3001/githubLogin?socketId=${this.state.socket.id}`,
			'',
			`toolbar=no, location=no, directories=no, status=no, menubar=no, 
  scrollbars=no, resizable=no, copyhistory=no, width=${600}, 
  height=${600}, top=${window.innerHeight / 2 - 300}, left=${window.innerWidth / 2 - 300}`
		);
	}

	render() {
		return (
			<div className="loginForm">
				<h1 className="mainHeading">Login</h1>
				<form className="center">
					<div>
						<input
							type="text"
							name="username"
							placeholder="Username"
							value={this.state.username}
							onChange={this.handleChange}
							disabled={this.props.requestInProgress}
							className={
								this.state.usernameError
									? 'input input--main input--error'
									: 'input input--main'
							}
						/>
						{this.state.usernameError && (
							<InputError errorMessage={this.state.usernameErrorMessage} />
						)}
					</div>
					<div>
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={this.state.password}
							onChange={this.handleChange}
							disabled={this.props.requestInProgress}
							className={
								this.state.passwordError
									? 'input input--main input--error mb-small'
									: 'input input--main mb-small'
							}
						/>
						{this.state.passwordError && (
							<InputError errorMessage={this.state.passwordErrorMessage} />
						)}
					</div>
					<div>
						<input
							name="login"
							className="btn btn__loginRegister btn--large btn--dark"
							type="submit"
							value="Login"
							disabled={this.props.requestInProgress}
							onClick={this.handleSubmit}
						/>
					</div>
					<div>
						<input
							disabled={this.props.requestInProgress}
							onClick={this.handleGithubLogin}
							type="button"
							className="btn btn__loginRegister btn--large btn--dark"
							value="Github Login"
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default withRouter(LoginForm);
