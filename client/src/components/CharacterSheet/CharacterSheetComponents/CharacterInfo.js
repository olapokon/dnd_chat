import React from 'react';

function CharacterInfo(props) {
  return (
    <div id="characterInfo">
    <div className="row">
      <label>
        Character Name:
      </label>
        <input
          type="text"
          name="characterName"
          className="btmBorder bigInput form-control"
          value={props.characterName}
          onChange={props.handleChange}
        />
        </div>
      <div className="row">
        <label>
          Race:</label>
          <input type="text"  className="btmBorder bigInput form-control" name="race" value={props.race} onChange={props.handleChange} />
        
        <label>
          Alignment:
        </label>
          <input
            type="text"
            name="alignment"
             className="btmBorder bigInput form-control"
            value={props.alignment}
            onChange={props.handleChange}
          />
      </div>
    </div>
  );
}

export default CharacterInfo;
