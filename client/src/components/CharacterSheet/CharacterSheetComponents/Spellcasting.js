import React from 'react';

function Spellcasting(props) {
  return (
    <div className="container spellCastingBlock">
      <div className="container spellCasting">
        <h3 className="heading spellCasting__heading heading--3"> SpellCasting </h3>
        <ul className="list spellCasting__list">
          {props.spellCastingArray.map((spellCasting, idx) => {
            return (
              <li key={idx}>
                <div className="row spellCasting__row">
                  <label className="label spellCasting__label">SpellCasting Class</label>
                  <input
                    type="text"
                    className="input spellCasting__input input--mid  input--btmBorder"
                    name="spellCastingClass"
                    onChange={function(event) {
                      props.handleChangeSpellCasting(event, idx);
                    }}
                    value={spellCasting.spellCastingClass}
                  />
                  <label className="label spellCasting__label">SpellCasting Ability</label>
                  &nbsp;
                  <select
                    name="spellCastingAbility"
                    className="select spellCasting__select btn btn--light btn--dropDown"
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
                  <label className="label spellCasting__label">Spell Save DC</label>
                  <input
                    className="input spellCasting__input input--small "
                    type="number"
                    name="spellSaveDc"
                    value={spellCasting.spellSaveDc}
                    onChange={function(event) {
                      props.handleChangeSpellCasting(event, idx);
                    }}
                  />
                  <label className="label spellCasting__label">Spell Attack Bonus</label>
                  <input
                    className="input spellCasting__input input--small "
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
                      className="btn btn--dark "
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
                      className="btn btn--danger "
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
      </div>
      <div className="container spells">
        <h3 className="heading spells__heading heading--3"> Spells</h3>
        <ul className="list spells__list">
          {props.spellsArray.map((spellLevel, idx) => {
            return (
              <li key={idx}>
                <div className="row spells__row">
                  <label className="label spells__label">
                    Spell Level
                    <input
                      className="input spells__input input--small input--clear"
                      type="number"
                      value={spellLevel.level}
                      readOnly
                    />
                  </label>
                  <label className="label spells__label">Slots</label>
                  <input
                    className="input spells__input input--small "
                    type="number"
                    name="slots"
                    value={spellLevel.slots}
                    onChange={function(event) {
                      props.handleChangeSpells(event, idx);
                    }}
                  />
                  <label className="label spells__label">Slots Expended</label>
                  <input
                    className="input spells__input input--small "
                    type="number"
                    name="slotsExpended"
                    value={spellLevel.slotsExpended}
                    onChange={function(event) {
                      props.handleChangeSpells(event, idx);
                    }}
                  />
                  <button
                    className="btn btn--dark "
                    type="button"
                    name="addSpell"
                    onClick={function(event) {
                      props.handleChangeSpells(event, idx);
                    }}
                  >
                    Add Spell
                  </button>
                </div>
                <ul className="list spell__list">
                  {spellLevel.spellList.map((spell, spidx) => {
                    return (
                      <li key={spidx}>
                        <div className="row spell__row">
                          <label className="label spell__label">
                            <input
                              className="checkbox spell__checkbox"
                              type="checkbox"
                              name="prepared"
                              checked={spell.isPrepared}
                              onChange={function(event) {
                                props.handleChangeSpells(event, idx, spidx);
                              }}
                            />
                          </label>
                          <label className="label spell__label">Spell Name</label>
                          <input
                            className="input spell__input input--big input--btmBorder"
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
                            className="btn btn--danger "
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
    </div>
  );
}

export default Spellcasting;
