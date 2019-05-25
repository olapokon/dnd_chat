import React from 'react';
import { NavLink } from 'react-router-dom';
//import globalStyles from '../assets/global_styles/bootstrap.min.module.css';
//import styles from './NavBar.module.css';

function NavBar(props) {
  if (props.loggedIn) {
    return (
      <nav>
        <ul>
          <li>
            <NavLink
              exact
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/games"
            >
              Games
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/profile"
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              onClick={props.logout}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav>
        <ul>
          <li>
            <NavLink
              exact
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/login"
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
            >
              Register
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
