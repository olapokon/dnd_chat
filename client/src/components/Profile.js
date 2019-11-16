import React from 'react';
import { NavLink } from 'react-router-dom';

function Profile(props) {
  return (
    <div className="profile">
      <h2 className="mainHeading mb-large">{props.user.username}'s characters</h2>
      {props.user.characterSheets && (
        <table className="characterTable mb-large">
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
                  <th scope="row">
                    <NavLink
                      exact
                      to={'/characterSheet'}
                      onClick={props.selectCharacter.bind(null, charSheet.uuid)}
                      className="characterTable__link"
                    >
                      {charSheet.characterName}
                    </NavLink>
                  </th>
                  <td className="center">
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
                  <td className="center">
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
      <div className="center">
        <NavLink
          className="btn btn--large btn--dark"
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
