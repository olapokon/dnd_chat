import React from 'react';

function Spellcasting(props) {
  return (
    <div className="spellCastingWrapper wrapperSettings leftFloat">
      <h3> SpellCasting: </h3>
      <ul className="midCol">
        {props.spellCastingArray.map((spellCasting, idx) => {
          return (
            <li key={idx}>
            <div className="row">
              <label>
                SpellCasting Class</label>
                <input
                  type="text"
                  className="midInput form-control edgeBox btmBorder"
                  name="spellCastingClass"
                  onChange={function(event) {
                    props.handleChangeSpellCasting(event, idx);
                  }}
                  value={spellCasting.spellCastingClass}
                />
              <label>
                SpellCasting Ability 
              </label>
              &nbsp;
                <select
                  name="spellCastingAbility"
                  className="btn btn-light lightDropDown"
                  value={spellCasting.spellCastingAbility}
                  onChange={function(event) {
                    props.handleChangeSpellCasting(event, idx);
                  }}
                >
                  <option value="" disabled>
                    Ability
                  </option>
                  <option value="int">INT</option>
                  <option value="wis">WIS</option>
                  <option value="cha">CHA</option>
                </select>
                &nbsp;
              <label>
                 Spell Save DC
              </label>
                <input
                  className="smallInput form-control edgeBox"
                  type="number"
                  name="spellSaveDc"
                  value={spellCasting.spellSaveDc}
                  onChange={function(event) {
                    props.handleChangeSpellCasting(event, idx);
                  }}
                />
              <label>
                Spell Attack Bonus
              </label>
                <input
                  className="smallInput form-control edgeBox"
                  type="number"
                  name="spellAttackBonus"
                  value={spellCasting.spellAttackBonus}
                  onChange={function(event) {
                    props.handleChangeSpellCasting(event, idx);
                  }}
                />
              {idx === 0 && (
                <button
                  type="button"
                  name="addSpellCasting"
                  className="btn btn-dark edgeBtn"
                  onClick={function(event) {
                    props.addRemoveSpellCastingClass(event, idx);
                  }}
                >
                  Add Class
                </button>
              )}
              {idx > 0 && (
                <button
                  type="button"
                  className="btn btn-danger edgeBtn"
                  name="removeSpellCasting"
                  onClick={function(event) {
                    props.addRemoveSpellCastingClass(event, idx);
                  }}
                >
                  -
                </button>
              )}
              </div>
            </li>
          );
        })}
      </ul>
      <h3> Spells</h3>
      <ul className="midCol">
        {props.spellsArray.map((spellLevel, idx) => {
          return (
            <li key={idx}>
            <div className="row">
              <label>
                Spell Level
                <input
                  className="spellLevel smallInput"
                  type="number"
                  value={spellLevel.level}
                  readOnly
                />
              </label>
              <label>
                Slots
              </label>
                <input
                  className="slots smallInput form-control edgeBox"
                  type="number"
                  name="slots"
                  value={spellLevel.slots}
                  onChange={function(event) {
                    props.handleChangeSpells(event, idx);
                  }}
                />
              <label>
                Slots Expended
              </label>
                <input
                  className="slots smallInput form-control edgeBox"
                  type="number"
                  name="slotsExpended"
                  value={spellLevel.slotsExpended}
                  onChange={function(event) {
                    props.handleChangeSpells(event, idx);
                  }}
                />
              <button
                className="btn btn-dark edgeBtn"
                type="button"
                name="addSpell"
                onClick={function(event) {
                  props.handleChangeSpells(event, idx);
                }}
              >
                Add Spell
              </button>
              </div>
              <ul className="midCol">
                {spellLevel.spellList.map((spell, spidx) => {
                  return (
                    <li key={spidx}>
                    <div className="row">
                      <label>
                        <input
                          className="prepared"
                          type="checkbox"
                          name="prepared"
                          checked={spell.isPrepared}
                          onChange={function(event) {
                            props.handleChangeSpells(event, idx, spidx);
                          }}
                        />
                      </label>
                      <label>
                        Spell Name
                      </label>
                        <input
                          className="spellName btmBorder bigInput form-control"
                          type="text"
                          name="spellName"
                          value={spell.spellName}
                          onChange={function(event) {
                            props.handleChangeSpells(event, idx, spidx);
                          }}
                        />

                      <button
                        type="button"
                        name="removeSpell"
                        className="btn btn-danger edgeBtn"
                        onClick={function(event) {
                          props.handleChangeSpells(event, idx, spidx);
                        }}
                      >
                       -
                      </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Spellcasting;
