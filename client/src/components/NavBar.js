import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar(props) {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink className="navbar__link" exact to="/">
            Home
          </NavLink>
        </li>
        {props.loggedIn && (
          <li>
            <NavLink className="navbar__link" exact to="/games">
              Games
            </NavLink>
          </li>
        )}
        {props.loggedIn && (
          <li>
            <NavLink className="navbar__link" exact to="/profile">
              Profile
            </NavLink>
          </li>
        )}
        {props.loggedIn && (
          <li className="ml-auto">
            <NavLink className="navbar__link" to="/" onClick={props.logout}>
              Logout
            </NavLink>
          </li>
        )}
        {!props.loggedIn && (
          <li className="ml-auto">
            <NavLink className="navbar__link" exact to="/login">
              Login
            </NavLink>
          </li>
        )}
        {!props.loggedIn && (
          <li>
            <NavLink className="navbar__link" to="/register">
              Register
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
