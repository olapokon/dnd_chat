import React from 'react';

const savingThrows = [
  { name: 'strSave', displayName: 'Strength', relatedAttribute: 'str' },
  { name: 'dexSave', displayName: 'Dexterity', relatedAttribute: 'dex' },
  { name: 'conSave', displayName: 'Constitution', relatedAttribute: 'con' },
  { name: 'intSave', displayName: 'Intelligence', relatedAttribute: 'int' },
  { name: 'wisSave', displayName: 'Wisdom', relatedAttribute: 'wis' },
  { name: 'chaSave', displayName: 'Charisma', relatedAttribute: 'cha' }
];

function AbilityScores(props) {
  return (
    <div>
      <div className="abilityScores leftFloat">
        <h3> Ability Scores: </h3>
        <ul>
          <li>
            <div>
              <label> STR: </label>
            </div>
            <input
              className="abScore smallInput"
              type="number"
              name="str"
              value={props.str}
              onChange={props.handleChange}
            />
            <input
              className="abModifier smallInput"
              type="number"
              name="strMod"
              value={props.str && props.calculateModifier(props.str, false)}
              readOnly
            />
          </li>
          <li>
            <div>
              <label> DEX: </label>
            </div>
            <input
              className="abScore smallInput"
              type="number"
              name="dex"
              value={props.dex}
              onChange={props.handleChange}
            />
            <input
              className="abModifier smallInput"
              type="number"
              name="dexMod"
              value={props.dex && props.calculateModifier(props.dex, false)}
              readOnly
            />
          </li>
          <li>
            <div>
              <label> CON: </label>
            </div>
            <input
              className="abScore smallInput"
              type="number"
              name="con"
              value={props.con}
              onChange={props.handleChange}
            />
            <input
              className="abModifier smallInput"
              type="number"
              name="conMod"
              value={props.con && props.calculateModifier(props.con, false)}
              readOnly
            />
          </li>
          <li>
            <div>
              <label> INT: </label>
            </div>
            <input
              className="abScore smallInput"
              type="number"
              name="int"
              value={props.int}
              onChange={props.handleChange}
            />
            <input
              className="abModifier smallInput"
              type="number"
              name="intMod"
              value={props.int && props.calculateModifier(props.int, false)}
              readOnly
            />
          </li>
          <li>
            <div>
              <label> WIS: </label>
            </div>
            <input
              className="abScore smallInput"
              type="number"
              name="wis"
              value={props.wis}
              onChange={props.handleChange}
            />
            <input
              className="abModifier smallInput"
              type="number"
              name="wisMod"
              value={props.wis && props.calculateModifier(props.wis, false)}
              readOnly
            />
          </li>
          <li>
            <div>
              <label> CHA: </label>
            </div>
            <input
              className="abScore smallInput"
              type="number"
              name="cha"
              value={props.cha}
              onChange={props.handleChange}
            />
            <input
              className="abModifier smallInput"
              type="number"
              name="chaMod"
              value={props.cha && props.calculateModifier(props.cha, false)}
              readOnly
            />
          </li>
        </ul>
      </div>

      <div className="savingThrowsProf leftFloat">
        <div className="savingThrows">
          <h3> Saving Throws: </h3>
          <ul>
            {savingThrows.map(savingThrow => {
              return (
                <li key={savingThrow.name}>
                  <input
                    className="savThrowBox"
                    type="checkbox"
                    name={savingThrow.name}
                    onChange={props.handleChange}
                    checked={props.proficienciesArray.includes(savingThrow.name)}
                  />
                  <input
                    className="savThrow smallInput"
                    type="number"
                    value={props.calculateModifier(
                      props[savingThrow.relatedAttribute],
                      props.proficienciesArray.includes(savingThrow.name)
                    )}
                    readOnly
                  />
                  <label>{savingThrow.displayName}</label>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <label> Proficiency Bonus: </label>
          <input
            className="smallInput"
            type="number"
            name="proficiency"
            value={props.charClassArray[0].level && props.calculateProficiency()}
            readOnly
          />
        </div>
        <div>
          <label> Inspiration: </label>
          <input
            className="smallInput"
            type="number"
            name="inspiration"
            value={props.inspiration}
            onChange={props.handleChange}
          />
        </div>
        <div>
          <label>
            Passive Perception:
            <input
              className="smallInput"
              type="number"
              name="passivePerception"
              value={
                10 +
                props.calculateModifier(props.wis, props.proficienciesArray.includes('perception'))
              }
              readOnly
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default AbilityScores;
