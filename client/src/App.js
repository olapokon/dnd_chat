import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
//import './App.module.css';

import socket from './socket';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Chatroom from './components/Chatroom';
import Profile from './components/Profile';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Games from './components/Games';
import NotFound from './components/NotFound';

//dokimastika
import DiceRoller from './components/DiceRoller';
import CharacterSheet from './components/CharacterSheet/CharacterSheet';
import CharacterSheetChat from './components/CharacterSheet/CharacterSheetChat';

//ISWS XREIAZETAI ALLAGES TO ROUTING GENIKA (react-router docs ktl)

// function ProtectedRoute({ component: Component, ...rest }) {
//   return (
//     <Route {...rest} render={props =>
//       props.loggedIn ? (
//       <Component {...props} />
//       ) : (
//       <Redirect to='/' />
//       )
//     }
//     />
//   );
// }

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
    this.renderChatroomOrRedirect = this.renderChatroomOrRedirect.bind(this);
    this.renderProfileOrRedirect = this.renderProfileOrRedirect.bind(this);
    this.logout = this.logout.bind(this);
    this.updateUser = this.updateUser.bind(this);
    //error handling
    this.updateError = this.updateError.bind(this);

    this.getChatrooms = this.getChatrooms.bind(this);

    this.selectCharacter = this.selectCharacter.bind(this);
    this.deleteCharacter = this.deleteCharacter.bind(this);
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
    this.state.socket.removeChatroomListListener();
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
  //MALLON THA XREIASTEI NA GINETAI CLEARED O SELECTED SE DIAFORES PERIPTWSEIS (e.g. otan ginetai load allos xarakthras)
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

  //ta chatrooms den kanoun load sto state an den exei ginei login, opote to condition den isxyei pote pros to paron
  renderChatroomOrRedirect(chatroom) {
    if (!this.state.user) {
      console.log('Redirected: Log in to access the chat');
      return <Redirect to="/" />;
    }
    return (
      <Chatroom
        //chatrooms
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
  }

  renderProfileOrRedirect() {
    if (!this.state.user) {
      return <Redirect to="/" />;
    }
    return (
      <Profile
        user={this.state.user}
        selectCharacter={this.selectCharacter}
        deleteCharacter={this.deleteCharacter}
      />
    );
  }

  // renderError() {
  //   if(this.state.errorDisplay) {
  //     return (
  //       <div style={{ backgroundColor: 'fuchsia', color: 'yellow', fontSize: '1em', padding: '.5em' }}>{this.state.errorMessage}</div>
  //     );
  //   }
  // }

  render() {
    if (this.state.checkingLoginStatus) {
      return (
        <div className="App">
          <NavBar loggedIn={this.state.loggedIn} logout={this.logout} />
          <h1>Loading...</h1>
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

          {/* chatrooms list render */}
          {/* <div>
            {this.state.chatrooms &&
              this.state.chatroomsList.map(function(chatroom) {
                return <h3 key={`${chatroom.name}name`}>{chatroom.name}</h3>;
              })}
          </div> */}

          <Switch>
            <Route exact path="/" render={props => <Home user={this.state.user} />} />
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
            <Route
              exact
              path="/games"
              component={() => <Games createChatroom={this.state.socket.createChatroom} />}
            />
            <Route exact path="/profile" render={props => this.renderProfileOrRedirect()} />
            {/* <ProtectedRoute path='/chatroom'
              loggedIn={this.state.loggedIn}
              emitChatMessage={this.state.socket.emitChatMessage}
              addChatMessageHandler={this.state.socket.addChatMessageHandler}
              removeChatMessageHandler={this.state.socket.removeChatMessageHandler}
              component={Chatroom}/> */}

            {/* chatrooms */}
            {this.state.chatrooms &&
              this.state.chatroomKeys.map(chatroom => {
                return (
                  <Route
                    key={`${chatroom}route`}
                    exact
                    path={`/${chatroom}`}
                    render={props => this.renderChatroomOrRedirect(chatroom, props)}
                  />
                );
              })}

            {/* dokimastiko gia to charsheet   */}
            {/* <Route exact path="/characterSheet" component={CharacterSheet} /> */}
            <Route
              exact
              path="/characterSheet"
              render={props => (
                <CharacterSheet
                  user={this.state.user}
                  selectedCharacter={this.state.selectedCharacter}
                  selectCharacter={this.selectCharacter}
                  updateUser={this.updateUser}
                />
              )}
            />
            <Route
              exact
              path="/characterSheetChat"
              render={props => (
                <CharacterSheetChat
                  user={this.state.user}
                  selectedCharacter={this.state.selectedCharacter}
                  selectCharacter={this.selectCharacter}
                  updateUser={this.updateUser}
                />
              )}
            />

            {/* dokimastiko gia dice roller */}
            <Route exact path="/diceRoller" component={DiceRoller} />

            {/* pithanws thelei allages to function kai conditions for to NotFound route */}
            <Route render={() => (!this.state.chatroomKeys ? null : <NotFound />)} />
          </Switch>
        </div>
      );
    }
  }
}

export default App;
