import React from 'react';
import { NavLink } from 'react-router-dom';

function Profile(props) {
  return (
    <div>
      <h1>User {props.user.username}'s profile</h1>
      <h2>{props.user.username}'s characters:</h2>
      <ul>
        <li>
          <NavLink exact to={'/characterSheet'}>
            Create New Character
          </NavLink>
        </li>
        {props.user.characterSheets &&
          props.user.characterSheets.map(charSheet => {
            return (
              <li key={charSheet.uuid}>
                <NavLink
                  exact
                  to={'/characterSheet'}
                  onClick={props.selectCharacter.bind(null, charSheet.uuid)}
                >
                  {charSheet.charClassArray.length > 1
                    ? `${charSheet.characterName} ${charSheet.charClassArray[0].class}/${
                        charSheet.charClassArray[1].class
                      }`
                    : `${charSheet.characterName} ${charSheet.charClassArray[0].class}`}
                </NavLink>
                <button onClick={props.deleteCharacter.bind(null, charSheet.uuid)}>
                  Delete character
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Profile;
