import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './RegistrationForm.css';

class RegistrationForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
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
    if (this.state.password && this.state.password === this.state.confirmPassword) {
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
            this.props.updateError(res.data.error);
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
    } else {
      console.log('passwords do not match');
      this.props.updateError('Passwords do not match');
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirect }} />;
    } else {
      return (
        <div id="registrationForm">
          <h1 id="header">Registration Form</h1>
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
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input className="btn btn-primary btn-lg center" type="submit" value="Register" onClick={this.handleSubmit} />
            </div>
          </form>
        </div>
      );
    }
  }
}

export default RegistrationForm;
