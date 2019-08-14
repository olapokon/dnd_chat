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
        <h3> Ability Scores</h3>
        <ul>
          <li>
            <div>
              <label> STR: </label>
            </div>
            <div className="row">
            <input
              className="abScore smallInput form-control edgeBox"
              type="number"
              name="str"
              value={props.str}
              onChange={props.handleChange}
            />
            <div className="abModifiers">
            <input
              className="abModifier smallInput form-control edgeBox"
              type="number"
              name="strMod"
              value={props.str && props.calculateModifier(props.str, false)}
              readOnly
            />
            </div></div>
          </li>
          <li>
            <div>
              <label> DEX: </label>
            </div>
            <div className="row">
            <input
              className="abScore smallInput form-control edgeBox"
              type="number"
              name="dex"
              value={props.dex}
              onChange={props.handleChange}
            />
            <input
              className="abModifier smallInput form-control edgeBox"
              type="number"
              name="dexMod"
              value={props.dex && props.calculateModifier(props.dex, false)}
              readOnly
            />
            </div>
          </li>
          <li>
            <div>
              <label> CON: </label>
            </div>
            <div className="row">
            <input
              className="abScore smallInput form-control edgeBox"
              type="number"
              name="con"
              value={props.con}
              onChange={props.handleChange}
            />
            <input
              className="abModifier smallInput form-control edgeBox"
              type="number"
              name="conMod"
              value={props.con && props.calculateModifier(props.con, false)}
              readOnly
            />
            </div>
          </li>
          <li>
            <div>
              <label> INT: </label>
            </div>
            <div className="row">
            <input
              className="abScore smallInput form-control edgeBox"
              type="number"
              name="int"
              value={props.int}
              onChange={props.handleChange}
            />
            <input
              className="abModifier smallInput form-control edgeBox"
              type="number"
              name="intMod"
              value={props.int && props.calculateModifier(props.int, false)}
              readOnly
            />
            </div>
          </li>
          <li>
            <div>
              <label> WIS: </label>
            </div>
            <div className="row">
            <input
              className="abScore smallInput form-control edgeBox"
              type="number"
              name="wis"
              value={props.wis}
              onChange={props.handleChange}
            />
            <input
              className="abModifier smallInput form-control edgeBox"
              type="number"
              name="wisMod"
              value={props.wis && props.calculateModifier(props.wis, false)}
              readOnly
            />
            </div>
          </li>
          <li>
            <div>
              <label> CHA: </label>
            </div>
            <div className="row">
            <input
              className="abScore smallInput form-control edgeBox"
              type="number"
              name="cha"
              value={props.cha}
              onChange={props.handleChange}
            />
            <input
              className="abModifier smallInput form-control edgeBox"
              type="number"
              name="chaMod"
              value={props.cha && props.calculateModifier(props.cha, false)}
              readOnly
            />
            </div>
          </li>
        </ul>
      </div>

      <div className="savingThrowsProf leftFloat">
        <div className="savingThrows">
          <h3> Saving Throws</h3>
          <ul>
            {savingThrows.map(savingThrow => {
              return (
                <li key={savingThrow.name}>
                <div className="row">
                <div class="form-check">
                  <input
                    className="savThrowBox"
                    type="checkbox"
                    name={savingThrow.name}
                    onChange={props.handleChange}
                    checked={props.proficienciesArray.includes(savingThrow.name)}
                  />
                  </div>
                  <input
                    className="savThrow smallInput form-control edgeBox"
                    type="number"
                    value={props.calculateModifier(
                      props[savingThrow.relatedAttribute],
                      props.proficienciesArray.includes(savingThrow.name)
                    )}
                    readOnly
                  />
                  <label>{savingThrow.displayName}</label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="row">
          <label> Proficiency Bonus: </label>
          
          <input
            className="smallInput form-control edgeBox"
            type="number"
            name="proficiency"
            value={props.charClassArray[0].level && props.calculateProficiency()}
            readOnly
          />
        </div>
        <div className="row">
          <label> Inspiration: </label>
          <input
            className="smallInput form-control edgeBox"
            type="number"
            name="inspiration"
            value={props.inspiration}
            onChange={props.handleChange}
          />
        </div>
        <div className="row">
          <label> Passive Perception:</label>
            <input
              className="smallInput form-control edgeBox"
              type="number"
              name="passivePerception"
              value={
                10 +
                props.calculateModifier(props.wis, props.proficienciesArray.includes('perception'))
              }
              readOnly
            />
          
        </div>
      </div>
    </div>
  );
}

export default AbilityScores;
