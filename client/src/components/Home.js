import React from 'react';
import { NavLink } from 'react-router-dom';

function Home(props) {
	return (
		<div className="home">
			<h1 className="mainHeading mb-large">Homepage</h1>
			{!props.loggedIn ? (
				<div>
					<p className="center mb-large">
						Login to access the chatrooms or create a new character sheet.
					</p>
					<p className="center">
						<NavLink className="btn btn--large btn--dark" exact to="/login">
							Login
						</NavLink>
					</p>
				</div>
			) : (
				<div>
					<p className="center mb-large">
						Create a new game in the Games tab or access the character sheet in the
						Profile tab.
					</p>
					<p className="center">
						<NavLink className="btn btn--large btn--dark" exact to="/games">
							Games
						</NavLink>{' '}
						<NavLink className="btn btn--large btn--dark" exact to="/profile">
							Profile
						</NavLink>
					</p>
				</div>
			)}
		</div>
	);
}

export default Home;
