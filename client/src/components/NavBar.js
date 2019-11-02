import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar(props) {
  return (
    <nav id="mainNav" className="navbar navbar-expand">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/">
            Home
          </NavLink>
        </li>
        {props.loggedIn && (
          <li>
            <NavLink className="nav-link" exact to="/games">
              Games
            </NavLink>
          </li>
        )}
        {props.loggedIn && (
          <li>
            <NavLink className="nav-link" exact to="/profile">
              Profile
            </NavLink>
          </li>
        )}
        {props.loggedIn && (
          <li>
            <NavLink className="nav-link" to="/" onClick={props.logout}>
              Logout
            </NavLink>
          </li>
        )}
        {!props.loggedIn && (
          <li>
            <NavLink className="nav-link" exact to="/login">
              Login
            </NavLink>
          </li>
        )}
        {!props.loggedIn && (
          <li>
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
