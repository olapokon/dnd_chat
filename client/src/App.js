import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import './sass/App.scss';

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

function ProtectedRoute({ path, component: Component, loggedIn, ...rest }) {
  return (
    <Route
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
      // socket: socket(),
      loadingStatus: true,
      selectedCharacter: '',
      currentChatroom: null,
      currentChatroomKey: null,
      errorDisplay: false,
      errorMessage: '',
      requestInProgress: false
    };
    this.getUser = this.getUser.bind(this);
    this.updateUserAndOpenSocket = this.updateUserAndOpenSocket.bind(this);
    this.logout = this.logout.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.selectCharacter = this.selectCharacter.bind(this);
    this.deleteCharacter = this.deleteCharacter.bind(this);
    this.updateError = this.updateError.bind(this);
    // this.updateCurrentChatroomKey = this.updateCurrentChatroomKey.bind(this);
    this.changeRequestInProgress = this.changeRequestInProgress.bind(this);
  }

  componentDidMount() {
    this.getUser();
    // this.setState({
    //   socket: socket()
    // });
  }

  componentDidUpdate() {
    if (this.state.socket) {
      this.state.socket.removeChatroomListListener();
      this.state.socket.addChatroomListListener(chatroom => {
        const currentChatroom = chatroom;
        this.setState({ currentChatroom });
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
        if (res.data.user) {
          if (!this.state.user || this.state.user.username !== res.data.user.username) {
            //console.log('User saved in the server session: ' + res.data.user.username);
            this.updateUserAndOpenSocket(res.data.user);
          } else {
            this.updateUser(res.data.user);
          }
        } else {
          this.setState({
            user: null,
            loggedIn: false,
            loadingStatus: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loadingStatus: false
        });
      });
  }

  //update user and open new socket connection (for login etc.)
  updateUserAndOpenSocket(user) {
    this.setState(
      {
        user: user,
        loggedIn: true,
        loadingStatus: false,
        socket: socket()
      },
      () => {
        this.state.socket.removeChatroomListListener();
        this.state.socket.addChatroomListListener(chatroom => {
          const currentChatroom = chatroom;
          this.setState({ currentChatroom });
        });
      }
    );
  }

  //update user without opening a new socket connection (update character sheets in the user object etc.)
  updateUser(user) {
    this.setState({
      user: user,
      loggedIn: true,
      loadingStatus: false
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

  // ==========================================================================
  // updateCurrentChatroomKey(currentChatroomKey) {
  //   this.setState({ currentChatroomKey });
  // }
  // ==========================================================================

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
            loadingStatus: false,
            selectedCharacter: '',
            currentChatroom: null
          });
          this.props.history.push(`/`);
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loadingStatus: false
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
    if (
      window.confirm('Are you sure you wish to permanently delete this character?') &&
      !this.state.requestInProgress
    ) {
      this.changeRequestInProgress(true);
      axios
        .post('/characterSheetDelete', {
          uuid: id
        })
        .then(res => {
          console.log(res.data.message);
          this.updateUser(res.data.user);
          this.changeRequestInProgress(false);
          this.props.history.push('/profile');
        })
        .catch(error => {
          console.log(error);
          this.changeRequestInProgress(false);
        });
    }
  }

  changeRequestInProgress(status) {
    if (status === true) {
      this.setState({ requestInProgress: true });
    } else {
      this.setState({ requestInProgress: false });
    }
  }

  render() {
    if (this.state.loadingStatus) {
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

          {/* main error display */}
          {this.state.errorDisplay && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#fd701e'
              }}
            >
              <div
                style={{
                  backgroundColor: 'fuchsia',
                  color: 'white',
                  padding: '0.7em',
                  textAlign: 'center',
                  width: '50rem'
                }}
              >
                {this.state.errorMessage}
              </div>
            </div>
          )}

          <main>
            <Switch>
              <Route
                exact
                path="/"
                render={props => <Home user={this.state.user} loggedIn={this.state.loggedIn} />}
              />
              <Route
                exact
                path="/login"
                render={() =>
                  this.state.user ? (
                    <Redirect to="/" />
                  ) : (
                    <LoginForm
                      updateUserAndOpenSocket={this.updateUserAndOpenSocket}
                      updateError={this.updateError}
                      requestInProgress={this.state.requestInProgress}
                      changeRequestInProgress={this.changeRequestInProgress}
                    />
                  )
                }
              />
              <Route
                exact
                path="/register"
                render={() =>
                  this.state.user ? (
                    <Redirect to="/" />
                  ) : (
                    <RegistrationForm
                      updateUserAndOpenSocket={this.updateUserAndOpenSocket}
                      updateError={this.updateError}
                      requestInProgress={this.state.requestInProgress}
                      changeRequestInProgress={this.changeRequestInProgress}
                    />
                  )
                }
              />
              <ProtectedRoute
                path="/games"
                component={Games}
                loggedIn={this.state.loggedIn}
                createChatroom={this.state.socket && this.state.socket.createChatroom}
                // updateCurrentChatroomKey={this.updateCurrentChatroomKey}
              />
              <ProtectedRoute
                path="/profile"
                component={Profile}
                loggedIn={this.state.loggedIn}
                user={this.state.user}
                selectCharacter={this.selectCharacter}
                deleteCharacter={this.deleteCharacter}
              />
              {this.state.socket && (
                <ProtectedRoute
                  path="/chatroom/:chatroomKey"
                  component={Chatroom}
                  loggedIn={this.state.loggedIn}
                  user={this.state.user}
                  updateUser={this.updateUser}
                  chatroomKey={this.state.currentChatroomKey}
                  currentChatroom={this.state.currentChatroom}
                  emitChatMessage={this.state.socket.emitChatMessage}
                  addChatMessageHandler={this.state.socket.addChatMessageHandler}
                  removeChatMessageHandler={this.state.socket.removeChatMessageHandler}
                  enterChatroom={this.state.socket.enterChatroom}
                  exitChatroom={this.state.socket.exitChatroom}
                  addChatroomErrorListener={this.state.socket.addChatroomErrorListener}
                  removeChatroomErrorListener={this.state.socket.removeChatroomErrorListener}
                  updateError={this.updateError}
                  requestInProgress={this.state.requestInProgress}
                  changeRequestInProgress={this.changeRequestInProgress}
                />
              )}
              <ProtectedRoute
                path="/characterSheet"
                version="standalone"
                component={CharacterSheet}
                loggedIn={this.state.loggedIn}
                user={this.state.user}
                selectedCharacter={this.state.selectedCharacter}
                selectCharacter={this.selectCharacter}
                updateUser={this.updateUser}
                deleteCharacter={this.deleteCharacter}
                requestInProgress={this.state.requestInProgress}
                changeRequestInProgress={this.changeRequestInProgress}
              />
              <Route render={() => <NotFound />} />
            </Switch>
          </main>
        </div>
      );
    }
  }
}

export default withRouter(App);
