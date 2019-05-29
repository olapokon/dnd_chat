import React from 'react';
import { NavLink } from 'react-router-dom';

function Home(props) {
  return (
    <div id="home">
      <h1 id="header" className="display-4 mb-4">
        Homepage
      </h1>
      {!props.loggedIn ? (
        <div>
          <p className="lead center">
            Login to access the chatrooms or create a new character sheet.
          </p>
          <p className="text-center">
            <NavLink className="btn btn-primary btn-lg center" exact to="/login">
              Login
            </NavLink>
          </p>
        </div>
      ) : (
        <div>
          <p className="lead center">
            Create a new game in the Games tab or access the character sheet in the Profile tab.
          </p>
          <p className="text-center">
            <NavLink className="btn btn-primary btn-lg center" exact to="/games">
              Games
            </NavLink>
            {' '}
            <NavLink className="btn btn-primary btn-lg center" exact to="/profile">
              Profile
            </NavLink>
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
