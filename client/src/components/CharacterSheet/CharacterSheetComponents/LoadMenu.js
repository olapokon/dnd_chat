import React from 'react';

function LoadMenu({ user, handleLoad }) {
  return (
    <div id="loadMenu">
      <select name="loadMenu" onChange={handleLoad}>
        <option>Choose Character</option>
        <option value="new">Create New Character</option>
        {user &&
          user.characterSheets.map(charSheet => {
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
