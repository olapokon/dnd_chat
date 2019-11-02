import React from 'react';
import { NavLink } from 'react-router-dom';

function Profile(props) {
  return (
    <div id="profile">
      <h2 id="profileHeader">{props.user.username}'s characters</h2>
      {props.user.characterSheets && (
        <table id="characterTable">
          <thead>
            <tr>
              <th scope="col">Character Name</th>
              <th scope="col">Class</th>
              <th scope="col">Total level</th>
            </tr>
          </thead>
          <tbody>
            {props.user.characterSheets.map(charSheet => {
              return (
                <tr key={charSheet.uuid}>
                  <th id="characterLink" scope="row">
                    <NavLink
                      exact
                      to={'/characterSheet'}
                      onClick={props.selectCharacter.bind(null, charSheet.uuid)}
                    >
                      {charSheet.characterName}
                    </NavLink>
                  </th>
                  <td>
                    {charSheet.charClassArray.length > 1
                      ? (function() {
                          let charClass = '';
                          /* maximum 4 classes displayed for multiclass characters */
                          const maximumClassesDisplayed =
                            charSheet.charClassArray.length > 4
                              ? 4
                              : charSheet.charClassArray.length;
                          for (let i = 0; i < maximumClassesDisplayed; i++) {
                            charClass += charSheet.charClassArray[i].class + ' ';
                          }
                          return charClass.trim();
                        })()
                      : charSheet.charClassArray[0].class}
                  </td>
                  <td className="totalLevelCell">
                    {charSheet.charClassArray.length > 1
                      ? (function() {
                          let totalLevel = 0;
                          for (let i = 0; i < charSheet.charClassArray.length; i++) {
                            totalLevel += +charSheet.charClassArray[i].level;
                          }
                          return totalLevel;
                        })()
                      : charSheet.charClassArray[0].level}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <div id="newCharacterButton">
        <NavLink
          className="btn btn-primary btn-lg"
          exact
          to={'/characterSheet'}
          onClick={props.selectCharacter.bind(null, 'new')}
        >
          Create New Character
        </NavLink>
      </div>
    </div>
  );
}

export default Profile;
