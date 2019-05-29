import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post('/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        //console.log(res.data);
        if (res.data.authenticationError) {
          this.props.updateError(res.data.authenticationError);
          throw new Error(res.data.authenticationError);
        }
        this.props.updateUserAndOpenSocket(res.data.user);
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
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input className="btn btn-primary btn-lg center" type="submit" value="Login" onClick={this.handleSubmit} />
            </div>
          </form>
        </div>
      );
    }
  }
}

export default LoginForm;
