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
    <div className="container abilitiesST">
      <div className="container abilities">
        <h3 className="heading abilities__heading heading--3"> Ability Scores</h3>
        <ul>
          <li>
            <div>
              <label className="label abilities_label"> STR </label>
            </div>
            <div className="row abilities__row">
              <input
                className="input abilities__score input--small "
                type="number"
                name="str"
                value={props.str}
                onChange={props.handleChange}
              />
              <input
                className="input abilities__mod input--small  input--readonly"
                type="number"
                name="strMod"
                value={props.str && props.calculateModifier(props.str, false)}
                readOnly
              />
            </div>
          </li>
          <li>
            <div>
              <label className="label abilities_label"> DEX </label>
            </div>
            <div className="row abilities__row">
              <input
                className="input abilities__score input--small "
                type="number"
                name="dex"
                value={props.dex}
                onChange={props.handleChange}
              />
              <input
                className="input abilities__mod input--small  input--readonly"
                type="number"
                name="dexMod"
                value={props.dex && props.calculateModifier(props.dex, false)}
                readOnly
              />
            </div>
          </li>
          <li>
            <div>
              <label className="label abilities_label"> CON </label>
            </div>
            <div className="row abilities__row">
              <input
                className="input abilities__score input--small "
                type="number"
                name="con"
                value={props.con}
                onChange={props.handleChange}
              />
              <input
                className="input abilities__mod input--small  input--readonly"
                type="number"
                name="conMod"
                value={props.con && props.calculateModifier(props.con, false)}
                readOnly
              />
            </div>
          </li>
          <li>
            <div>
              <label className="label abilities_label"> INT </label>
            </div>
            <div className="row abilities__row">
              <input
                className="input abilities__score input--small "
                type="number"
                name="int"
                value={props.int}
                onChange={props.handleChange}
              />
              <input
                className="input abilities__mod input--small  input--readonly"
                type="number"
                name="intMod"
                value={props.int && props.calculateModifier(props.int, false)}
                readOnly
              />
            </div>
          </li>
          <li>
            <div>
              <label className="label abilities_label"> WIS </label>
            </div>
            <div className="row abilities__row">
              <input
                className="input abilities__score input--small "
                type="number"
                name="wis"
                value={props.wis}
                onChange={props.handleChange}
              />
              <input
                className="input abilities__mod input--small  input--readonly"
                type="number"
                name="wisMod"
                value={props.wis && props.calculateModifier(props.wis, false)}
                readOnly
              />
            </div>
          </li>
          <li>
            <div>
              <label className="label abilities_label"> CHA </label>
            </div>
            <div className="row abilities__row">
              <input
                className="input abilities__score input--small "
                type="number"
                name="cha"
                value={props.cha}
                onChange={props.handleChange}
              />
              <input
                className="input abilities__mod input--small  input--readonly"
                type="number"
                name="chaMod"
                value={props.cha && props.calculateModifier(props.cha, false)}
                readOnly
              />
            </div>
          </li>
        </ul>
      </div>

      <div className="container stProf">
        <div className="savingThrows">
          <h3 className="heading savingThrows__heading heading--3"> Saving Throws</h3>
          <ul>
            {savingThrows.map(savingThrow => {
              return (
                <li key={savingThrow.name}>
                  <div className="row savingThrows__row">
                    <input
                      className="checkbox checkbox__st"
                      type="checkbox"
                      name={savingThrow.name}
                      onChange={props.handleChange}
                      checked={props.proficienciesArray.includes(savingThrow.name)}
                    />
                    <input
                      className="input savingTrows__mod input--small  input--readonly"
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
        <div className="container profInspPerc">
          <div className="proficiency row proficiency__row">
            <label className="label proficiency__label"> Proficiency Bonus </label>

            <input
              className="input proficiency__mod input--small  input--readonly"
              type="number"
              name="proficiency"
              value={props.charClassArray[0].level && props.calculateProficiency()}
              readOnly
            />
          </div>
          <div className="inspiration row inspiration__row">
            <label className="label inspiration__label"> Inspiration </label>
            <input
              className="input inspiration__score input--small "
              type="number"
              name="inspiration"
              value={props.inspiration}
              onChange={props.handleChange}
            />
          </div>
          <div className="passPerc row passPerc__row">
            <label className="label pasPerc__label"> Passive Perception </label>
            <input
              className="input passPerc__mod input--small  input--readonly"
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
    </div>
  );
}

export default AbilityScores;
