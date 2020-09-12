import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import InputError from './InputError';

class RegistrationForm extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			usernameError: false,
			usernameErrorMessage: '',
			passwordError: false,
			confirmError: false,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	async handleSubmit(event) {
		event.preventDefault();
		if (!this.props.requestInProgress) {
			await this.setState({
				usernameError: false,
				passwordError: false,
				confirmError: false,
			});

			let registrationError = 0;
			if (!this.state.password.trim()) {
				this.setState({ passwordError: true });
				registrationError = 1;
			}
			if (this.state.password !== this.state.confirmPassword) {
				this.setState({ confirmError: true });
				registrationError = 1;
			}
			if (!this.state.username.trim()) {
				this.setState({ usernameError: true, usernameErrorMessage: 'Invalid username' });
				registrationError = 1;
			}

			if (!registrationError) {
				this.props.changeRequestInProgress(true);
				axios
					.post('/register', {
						username: this.state.username,
						password: this.state.password,
					})
					.then((res) => {
						console.log(res.data);
						//custom "error" set on the /register POST route in routes.js
						if (!res.data.error) {
							this.props.updateUserAndOpenSocket(res.data.user);
						} else {
							//this.props.updateError(res.data.error);
							this.setState({
								usernameError: true,
								usernameErrorMessage: res.data.error,
							});
							throw new Error(res.data.error);
						}
					})
					.then(() => {
						this.props.history.push('/');
					})
					.catch((error) => {
						console.log(error);
						this.props.changeRequestInProgress(false);
					});
			}
		}
	}

	render() {
		return (
			<div className="registrationForm">
				<h1 className="mainHeading">Register</h1>
				<form className="center">
					<div>
						<input
							className={
								this.state.usernameError
									? 'input input--main input--error'
									: 'input input--main'
							}
							type="text"
							name="username"
							placeholder="Username"
							value={this.state.username}
							disabled={this.props.requestInProgress}
							onChange={this.handleChange}
						/>
						{this.state.usernameError && (
							<InputError errorMessage={this.state.usernameErrorMessage} />
						)}
					</div>
					<div>
						<input
							className={
								this.state.passwordError
									? 'input input--main input--error'
									: 'input input--main'
							}
							type="password"
							name="password"
							placeholder="Password"
							value={this.state.password}
							disabled={this.props.requestInProgress}
							onChange={this.handleChange}
						/>
						{this.state.passwordError && <InputError errorMessage="Invalid password" />}
					</div>
					<div>
						<input
							className={
								this.state.confirmError
									? 'input input--main input--error mb-small'
									: 'input input--main mb-small'
							}
							type="password"
							name="confirmPassword"
							placeholder="Confirm Password"
							value={this.state.confirmPassword}
							disabled={this.props.requestInProgress}
							onChange={this.handleChange}
						/>
						{this.state.confirmError && (
							<InputError errorMessage="Passwords do not match" />
						)}
					</div>
					<div>
						<input
							className="btn btn__loginRegister btn--large btn--dark"
							type="submit"
							value="Register"
							disabled={this.props.requestInProgress}
							onClick={this.handleSubmit}
						/>
					</div>
				</form>
			</div>
		);
	}
}

export default withRouter(RegistrationForm);
