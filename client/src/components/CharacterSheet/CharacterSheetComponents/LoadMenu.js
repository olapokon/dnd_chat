import React from 'react';

function LoadMenu(props) {
  return (
    <div className="charSelect">
      <select
        name="loadMenu"
        className="select charSelect__select btn btn--light"
        onChange={props.handleLoad}
      >
        <option>Choose Character</option>
        <option value="new">Create New Character</option>
        {props.user &&
          props.user.characterSheets.map(charSheet => {
            return (
              <option key={charSheet.uuid} value={charSheet.uuid}>
                {charSheet.characterName}
              </option>
            );
          })}
      </select>
    </div>
  );
}

export default LoadMenu;
