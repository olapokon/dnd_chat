import React from 'react';

function CharacterInfo(props) {
  return (
    <div className="container characterInfo">
      <div className="row characterInfo__row">
        <label className="label characterInfo__label">Character Name:</label>
        <input
          type="text"
          name="characterName"
          className="input characterInfo__input input--big input--btmBorder"
          value={props.characterName}
          onChange={props.handleChange}
        />
      </div>
      <div className="row characterInfo__row">
        <label className="label characterInfo__label">Race:</label>
        <input
          type="text"
          className="input characterInfo__input input--big input--btmBorder"
          name="race"
          value={props.race}
          onChange={props.handleChange}
        />

        <label className="label characterInfo__label">Alignment:</label>
        <input
          type="text"
          name="alignment"
          className="input characterInfo__input input--big input--btmBorder"
          value={props.alignment}
          onChange={props.handleChange}
        />
      </div>
    </div>
  );
}

export default CharacterInfo;
