import React from 'react';

function LoadMenu(props) {
  return (
    <div id="loadMenu">
      <select name="loadMenu" class="charSelect btn btn-light" onChange={props.handleLoad}>
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
