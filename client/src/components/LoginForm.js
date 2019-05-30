import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: null,
      usernameError: false,
      usernameErrorMessage: '',
      passwordError: false,
      passwordErrorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.setState({ usernameError: false, passwordError: false });
    axios
      .post('/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        //console.log(res.data);
        if (res.data.authenticationError) {
          //this.props.updateError(res.data.authenticationError);
          if (res.data.errorField === 'username') {
            this.setState({
              usernameError: true,
              usernameErrorMessage: res.data.authenticationError
            });
          } else if (res.data.errorField === 'password') {
            this.setState({
              passwordError: true,
              passwordErrorMessage: res.data.authenticationError
            });
          }
          throw new Error(res.data.authenticationError);
        }
        if (res.data.user) {
          this.props.updateUserAndOpenSocket(res.data.user);
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

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    } else {
      return (
        <div id="LoginForm">
          <h1 id="header">Login Form</h1>
          <form className="center">
            <div>
              <input
                id={this.state.usernameError ? 'registrationLoginErrorInput' : 'loginUsernameInput'}
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
                id={this.state.passwordError ? 'registrationLoginErrorInput' : 'loginPasswordInput'}
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {this.state.passwordError && (
                <p className="registrationLoginError">{this.state.passwordErrorMessage}</p>
              )}
            </div>
            <div>
              <input
                className="btn btn-primary btn-lg center"
                type="submit"
                value="Login"
                onClick={this.handleSubmit}
              />
            </div>
          </form>
        </div>
      );
    }
  }
}

export default LoginForm;
