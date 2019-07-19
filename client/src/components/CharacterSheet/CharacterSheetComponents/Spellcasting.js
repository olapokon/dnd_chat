import React from 'react';

function Spellcasting(props) {
  return (
    <div className="spellCastingWrapper wrapperSettings leftFloat">
      <h3> SpellCasting</h3>
      <ul className="midCol">
        {props.spellCastingArray.map((spellCasting, idx) => {
          return (
            <li key={idx}>
              <label>
                SpellCasting Class
                <input
                  maxLength="36"
                  type="text"
                  name="spellCastingClass"
                  onChange={function(event) {
                    props.handleChangeSpellCasting(event, idx);
                  }}
                  value={spellCasting.spellCastingClass}
                />
              </label>
              <label>
                SpellCasting Ability
                <select
                  name="spellCastingAbility"
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
              </label>
              <label>
                Spell Save DC
                <input
                  className="smallInput"
                  type="number"
                  name="spellSaveDc"
                  value={spellCasting.spellSaveDc}
                  onChange={function(event) {
                    props.handleChangeSpellCasting(event, idx);
                  }}
                />
              </label>
              <label>
                Spell Attack Bonus
                <input
                  className="smallInput"
                  type="number"
                  name="spellAttackBonus"
                  value={spellCasting.spellAttackBonus}
                  onChange={function(event) {
                    props.handleChangeSpellCasting(event, idx);
                  }}
                />
              </label>
              {idx === 0 && (
                <button
                  type="button"
                  name="addSpellCasting"
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
                  name="removeSpellCasting"
                  onClick={function(event) {
                    props.addRemoveSpellCastingClass(event, idx);
                  }}
                >
                  Remove Class
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <h3> Spells </h3>
      <ul className="midCol">
        {props.spellsArray.map((spellLevel, idx) => {
          return (
            <li key={idx}>
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
                <input
                  className="slots smallInput"
                  type="number"
                  name="slots"
                  value={spellLevel.slots}
                  onChange={function(event) {
                    props.handleChangeSpells(event, idx);
                  }}
                />
              </label>
              <label>
                Slots Expended
                <input
                  className="slots smallInput"
                  type="number"
                  name="slotsExpended"
                  value={spellLevel.slotsExpended}
                  onChange={function(event) {
                    props.handleChangeSpells(event, idx);
                  }}
                />
              </label>
              <button
                type="button"
                name="addSpell"
                onClick={function(event) {
                  props.handleChangeSpells(event, idx);
                }}
              >
                Add Spell
              </button>
              <ul className="midCol">
                {spellLevel.spellList.map((spell, spidx) => {
                  return (
                    <li key={spidx}>
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
                        <input
                          className="spellName"
                          type="text"
                          name="spellName"
                          value={spell.spellName}
                          onChange={function(event) {
                            props.handleChangeSpells(event, idx, spidx);
                          }}
                        />
                      </label>

                      <button
                        type="button"
                        name="removeSpell"
                        onClick={function(event) {
                          props.handleChangeSpells(event, idx, spidx);
                        }}
                      >
                        Remove Spell
                      </button>
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
