import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import socket from './socket';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Chatroom from './components/Chatroom';
import Profile from './components/Profile';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Games from './components/Games';
import NotFound from './components/NotFound';
import Loading from './components/Loading';
import CharacterSheet from './components/CharacterSheet/CharacterSheet';

//dokimastiko
import CharacterSheetChat from './components/CharacterSheet/CharacterSheetChat';

function ProtectedRoute({ key, path, component: Component, loggedIn, ...rest }) {
  // console.log(path);
  // console.log(rest);
  return (
    <Route
      key={key}
      exact
      path={path}
      render={() => (loggedIn ? <Component {...rest} /> : <Redirect to="/" />)}
    />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loggedIn: false,
      //socket: socket(),
      checkingLoginStatus: true,
      selectedCharacter: '',
      //chatrooms
      chatrooms: null,
      chatroomKeys: null,
      chatroomsList: null,
      //error handling
      errorDisplay: false,
      errorMessage: ''
    };
    this.getUser = this.getUser.bind(this);
    this.updateUserAndOpenSocket = this.updateUserAndOpenSocket.bind(this);
    this.logout = this.logout.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.getChatrooms = this.getChatrooms.bind(this);
    this.selectCharacter = this.selectCharacter.bind(this);
    this.deleteCharacter = this.deleteCharacter.bind(this);
    this.updateError = this.updateError.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  componentDidUpdate() {
    if (this.state.socket) {
      this.state.socket.removeChatroomListListener();
      this.state.socket.addChatroomListListener(chatrooms => {
        const chatroomsList = Object.values(chatrooms);
        const chatroomKeys = Object.keys(chatrooms);
        this.setState({ chatrooms, chatroomsList, chatroomKeys });
      });
    }
  }

  componentWillUnmount() {
    if (this.state.socket) {
      this.state.socket.removeChatroomListListener();
    }
  }

  getUser() {
    axios
      .get('/user')
      .then(res => {
        //console.log(res.data);
        if (res.data.user) {
          if (!this.state.user || this.state.user.username !== res.data.user.username) {
            //console.log('User saved in the server session: ' + res.data.user.username);
            this.updateUserAndOpenSocket(res.data.user);
          } else {
            this.updateUser(res.data.user);
          }
        } else {
          //console.log('No user in the server session');
          this.setState({
            user: null,
            loggedIn: false,
            checkingLoginStatus: false
          });
        }
      })
      //chatrooms
      .then(res => {
        this.getChatrooms();
      })
      .catch(error => {
        console.log(error);
        this.setState({
          checkingLoginStatus: false
        });
      });
  }

  //chatrooms
  getChatrooms() {
    this.state.socket.getChatrooms((err, chatrooms) => {
      const chatroomsList = Object.values(chatrooms);
      const chatroomKeys = Object.keys(chatrooms);
      this.setState({ chatrooms, chatroomsList, chatroomKeys });
    });
  }

  //update user and open new socket connection (for login etc.)
  updateUserAndOpenSocket(user) {
    this.setState({
      user: user,
      loggedIn: true,
      checkingLoginStatus: false,
      socket: socket()
    });
  }

  //update user without opening a new socket connection (update character sheets in the user object etc.)
  updateUser(user) {
    this.setState({
      user: user,
      loggedIn: true,
      checkingLoginStatus: false
    });
  }

  updateError(errorMessage) {
    clearTimeout(this.timeout);
    this.setState({
      errorDisplay: true,
      errorMessage
    });
    this.timeout = setTimeout(
      function() {
        this.setState({
          errorDisplay: false,
          errorMessage: ''
        });
      }.bind(this),
      4000
    );
  }

  logout(event) {
    event.preventDefault();
    axios
      .post('/logout')
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
          this.setState({
            user: null,
            loggedIn: false,
            checkingLoginStatus: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          checkingLoginStatus: false
        });
      });
  }

  //pass to profile so it can send user characterSheet and load specific charsheet
  selectCharacter(id) {
    this.setState({
      selectedCharacter: id
    });
  }

  deleteCharacter(id) {
    if (window.confirm('Are you sure you wish to permanently delete this character?')) {
      axios
        .post('/characterSheetDelete', {
          uuid: id
        })
        .then(res => {
          this.updateUser(res.data.user);
          console.log(res.data.message);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    if (this.state.checkingLoginStatus) {
      return (
        <div className="App">
          <NavBar loggedIn={this.state.loggedIn} logout={this.logout} />
          <Loading />
        </div>
      );
    } else {
      return (
        <div className="App">
          <NavBar loggedIn={this.state.loggedIn} logout={this.logout} />

          {/* error handling */}
          {this.state.errorDisplay && (
            <div
              style={{
                backgroundColor: 'fuchsia',
                color: 'yellow',
                fontSize: '1em',
                padding: '.5em'
              }}
            >
              {this.state.errorMessage}
            </div>
          )}

          <Switch>
            <Route
              exact
              path="/"
              render={props => <Home user={this.state.user} loggedIn={this.state.loggedIn} />}
            />
            <Route
              exact
              path="/login"
              render={() => (
                <LoginForm
                  updateUserAndOpenSocket={this.updateUserAndOpenSocket}
                  updateError={this.updateError}
                />
              )}
            />
            <Route
              exact
              path="/register"
              render={() => (
                <RegistrationForm
                  updateUserAndOpenSocket={this.updateUserAndOpenSocket}
                  updateError={this.updateError}
                />
              )}
            />
            <ProtectedRoute
              path="/games"
              component={Games}
              loggedIn={this.state.loggedIn}
              createChatroom={this.state.socket && this.state.socket.createChatroom}
            />
            <ProtectedRoute
              path="/profile"
              component={Profile}
              loggedIn={this.state.loggedIn}
              user={this.state.user}
              selectCharacter={this.selectCharacter}
              deleteCharacter={this.deleteCharacter}
            />
            {this.state.chatrooms &&
              this.state.chatroomKeys.map(chatroom => {
                return (
                  <ProtectedRoute
                    key={`${chatroom}route`}
                    exact
                    path={`/${chatroom}`}
                    component={Chatroom}
                    loggedIn={this.state.loggedIn}
                    user={this.state.user}
                    updateUser={this.updateUser}
                    chatroomKey={chatroom}
                    chatroomName={this.state.chatrooms[chatroom].name}
                    emitChatMessage={this.state.socket.emitChatMessage}
                    addChatMessageHandler={this.state.socket.addChatMessageHandler}
                    removeChatMessageHandler={this.state.socket.removeChatMessageHandler}
                    //pass the users array of the particular chatroom as props
                    //from the chatroomList object in state
                    userList={this.state.chatrooms[chatroom].userList}
                    enterChatroom={this.state.socket.enterChatroom}
                    exitChatroom={this.state.socket.exitChatroom}
                  />
                );
              })}
            <ProtectedRoute
              path="/characterSheet"
              component={CharacterSheet}
              loggedIn={this.state.loggedIn}
              user={this.state.user}
              selectedCharacter={this.state.selectedCharacter}
              selectCharacter={this.selectCharacter}
              updateUser={this.updateUser}
              deleteCharacter={this.deleteCharacter}
            />
            <ProtectedRoute
              path="/characterSheetChat"
              component={CharacterSheetChat}
              loggedIn={this.state.loggedIn}
              user={this.state.user}
              selectedCharacter={this.state.selectedCharacter}
              selectCharacter={this.selectCharacter}
              updateUser={this.updateUser}
            />
            {/* pithanws thelei allages to function kai conditions to NotFound route */}
            <Route render={() => (!this.state.chatroomKeys ? null : <NotFound />)} />
          </Switch>
        </div>
      );
    }
  }
}

export default App;
