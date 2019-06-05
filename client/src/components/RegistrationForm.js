import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class RegistrationForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      redirect: null,
      usernameError: false,
      usernameErrorMessage: '',
      passwordError: false,
      confirmError: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.setState({
      usernameError: false,
      passwordError: false,
      confirmError: false
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
      axios
        .post('/register', {
          username: this.state.username,
          password: this.state.password
        })
        .then(res => {
          console.log(res.data);
          //custom "error" set on the /register POST route in routes.js
          if (!res.data.error) {
            this.props.updateUserAndOpenSocket(res.data.user);
          } else {
            //this.props.updateError(res.data.error);
            this.setState({ usernameError: true, usernameErrorMessage: res.data.error });
            throw new Error(res.data.error);
          }
        })
        .then(() => {
          this.setState({
            redirect: '/'
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({
            checkingLoginStatus: false
          });
        });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    } else {
      return (
        <div id="registrationForm">
          <h1 id="header">Register</h1>
          <form className="center">
            <div>
              <input
                id={
                  this.state.usernameError
                    ? 'registrationLoginErrorInput'
                    : 'registrationUsernameInput'
                }
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              {this.state.usernameError && (
                <p className="registrationLoginError">{this.state.usernameErrorMessage}</p>
              )}
            </div>
            <div>
              <input
                id={
                  this.state.passwordError
                    ? 'registrationLoginErrorInput'
                    : 'registrationPasswordInput'
                }
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {this.state.passwordError && (
                <p className="registrationLoginError">Invalid password</p>
              )}
            </div>
            <div>
              <input
                id={
                  this.state.confirmError
                    ? 'registrationLoginErrorInput'
                    : 'registrationConfirmInput'
                }
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
              {this.state.confirmError && (
                <p className="registrationLoginError">Passwords do not match</p>
              )}
            </div>
            <div>
              <input
                className="btn btn-primary btn-lg center"
                type="submit"
                value="Register"
                onClick={this.handleSubmit}
              />
            </div>
          </form>
        </div>
      );
    }
  }
}

export default RegistrationForm;
