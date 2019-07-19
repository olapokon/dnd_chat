import React from 'react';

function CharacterInfo(props) {
  return (
    <div id="characterInfo">
      <label>
        Character Name
        <input
          type="text"
          name="characterName"
          value={props.characterName}
          onChange={props.handleChange}
        />
      </label>
      <div>
        <label>
          Race
          <input type="text" name="race" value={props.race} onChange={props.handleChange} />
        </label>
        <label>
          Alignment
          <input
            type="text"
            name="alignment"
            value={props.alignment}
            onChange={props.handleChange}
          />
        </label>
      </div>
    </div>
  );
}

export default CharacterInfo;
