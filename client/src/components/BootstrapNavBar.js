//de xrhsimopoieitai pouthena pros to paron, mono gia an xreiastei bootstrap me module classes

import React from 'react';
import { NavLink } from 'react-router-dom';
//import globalStyles from '../assets/global_styles/bootstrap.min.module.css';
//import styles from './NavBar.module.css';

function NavBar(props) {
  if (props.loggedIn) {
    return (
      <nav className={styles.mainNav}>
        <ul className={globalStyles['nav']}>
          <li className={globalStyles['nav-item']}>
            <NavLink
              exact
              to="/"
              className={`${globalStyles['nav-link']} ${globalStyles['active']}`}
            >
              Home
            </NavLink>
          </li>
          <li className={globalStyles['nav-item']}>
            <NavLink
              exact
              to="/games"
              className={`${globalStyles['nav-link']} ${globalStyles['active']}`}
            >
              Games
            </NavLink>
          </li>
          <li className={globalStyles['nav-item']}>
            <NavLink
              exact
              to="/profile"
              className={`${globalStyles['nav-link']} ${globalStyles['active']}`}
            >
              Profile
            </NavLink>
          </li>
          <li className={globalStyles['nav-item']}>
            <NavLink
              to="/"
              onClick={props.logout}
              className={`${globalStyles['nav-link']} ${globalStyles['active']}`}
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
        <ul className={globalStyles['nav']}>
          <li className={globalStyles['nav-item']}>
            <NavLink
              exact
              to="/"
              className={`${globalStyles['nav-link']} ${globalStyles['active']}`}
            >
              Home
            </NavLink>
          </li>
          <li className={globalStyles['nav-item']}>
            <NavLink
              exact
              to="/login"
              className={`${globalStyles['nav-link']} ${globalStyles['active']}`}
            >
              Login
            </NavLink>
          </li>
          <li className={globalStyles['nav-item']}>
            <NavLink
              to="/register"
              className={`${globalStyles['nav-link']} ${globalStyles['active']}`}
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
