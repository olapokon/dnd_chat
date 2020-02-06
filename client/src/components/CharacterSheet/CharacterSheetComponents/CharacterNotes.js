import React from 'react';

function CharacterNotes(props) {
  return (
    <div className="charNotes">
      <h3 className="heading charNotes__heading heading--3"> Notes </h3>
      <div className="hitDice">
        <label className="label hitDice__label"> Hit Dice</label>
        <textarea
          name="hitDice"
          className="tArea hitDice__tArea"
          value={props.hitDice}
          onChange={props.handleChange}
        />
      </div>
      <div className="notes">
        <label className="label notes__label"> Notes</label>
        <textarea
          name="charNotes"
          className="tArea notes__tArea"
          value={props.charNotes}
          onChange={props.handleChange}
        />
      </div>
    </div>
  );
}

export default CharacterNotes;
