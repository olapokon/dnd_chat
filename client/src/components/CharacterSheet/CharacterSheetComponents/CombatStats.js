import React from 'react';

function CombatStats(props) {
  return (
    <div className="combatWrapper wrapperSettings leftFloat">
      <h3>Combat</h3>
      <div className="acStatsWrapper leftFloat">
        <ul className="acStatsList">
          <li>
            <label>
              Armor Class:
              <div>
                <input
                  type="number"
                  name="armorClass"
                  className="smallInput"
                  value={props.armorClass}
                  onChange={props.handleChange}
                />
              </div>
            </label>
          </li>
          <li>
            <label>
              Initiative:
              <div>
                <input
                  type="number"
                  name="initiative"
                  className="smallInput"
                  value={props.initiative}
                  onChange={props.handleChange}
                />
              </div>
            </label>
          </li>
          <li>
            <label>
              Speed:
              <div>
                <input
                  type="number"
                  name="speed"
                  className="smallInput"
                  value={props.speed}
                  onChange={props.handleChange}
                />
                ft
              </div>
            </label>
          </li>
        </ul>
      </div>
      <div className="wrapperSettings">
        Hit Points
        <ul>
          <li>
            <label>Maximum</label>
            <input
              type="number"
              name="hpMax"
              className="midInput"
              value={props.hpMax}
              onChange={props.handleChange}
            />
          </li>
          <li>
            <label>Current</label>
            <input
              type="number"
              name="hpCurrent"
              className="midInput"
              value={props.hpCurrent}
              onChange={props.handleChange}
            />
          </li>
          <li>
            <label>Temporary</label>
            <input
              type="number"
              name="hpTemp"
              id="hpTemp"
              className="midInput"
              value={props.hpTemp}
              onChange={props.handleChange}
            />
          </li>
        </ul>
      </div>
      <div className="attackWrapper">
        <h4> Attack and Spellcasting: </h4>
        <ul className="attacksList">
          <button type="button" onClick={props.addAttack}>
            Add attack
          </button>
          {props.attacksArray.map((attack, idx) => {
            return (
              <li key={idx}>
                <label>Name(item/spell)</label>
                <input
                  type="text"
                  name="attackName"
                  className="attack"
                  value={attack.attackName}
                  onChange={function(event) {
                    props.handleChangeAttack(event, idx);
                  }}
                />
                <label>Attack Bonus</label>
                <input
                  type="number"
                  name="attackBonus"
                  className="attack smallInput"
                  value={attack.attackBonus}
                  onChange={function(event) {
                    props.handleChangeAttack(event, idx);
                  }}
                />
                <label>Damage Primary</label>
                <input
                  type="number"
                  name="atkDmgDno"
                  className="attack smallInput"
                  value={attack.atkDmgDno}
                  onChange={function(event) {
                    props.handleChangeAttack(event, idx);
                  }}
                />
                <select
                  name="atkDmgDice"
                  className="attack"
                  value={attack.atkDmgDice}
                  onChange={function(event) {
                    props.handleChangeAttack(event, idx);
                  }}
                >
                  <option value="" disabled>
                    Dmg Die
                  </option>
                  <option value="d4">d4</option>
                  <option value="d6">d6</option>
                  <option value="d8">d8</option>
                  <option value="d10">d10</option>
                  <option value="d12">d12</option>
                  <option value="d20">d20</option>
                  <option value="d100">d100</option>
                </select>
                <label>Damage Secondary</label>
                <input
                  type="number"
                  name="atkDmgDnoSec"
                  className="attack smallInput"
                  value={attack.atkDmgDnoSec}
                  onChange={function(event) {
                    props.handleChangeAttack(event, idx);
                  }}
                />
                <select
                  name="atkDmgDiceSec"
                  className="attack"
                  value={attack.atkDmgDiceSec}
                  onChange={function(event) {
                    props.handleChangeAttack(event, idx);
                  }}
                >
                  <option value="" disabled>
                    Dmg Die
                  </option>
                  <option value="d4">d4</option>
                  <option value="d6">d6</option>
                  <option value="d8">d8</option>
                  <option value="d10">d10</option>
                  <option value="d12">d12</option>
                  <option value="d20">d20</option>
                  <option value="d100">d100</option>
                </select>
                <label>Damage Bonus</label>
                <input
                  type="number"
                  name="damageBonus"
                  className="attack smallInput"
                  value={attack.damageBonus}
                  onChange={function(event) {
                    props.handleChangeAttack(event, idx);
                  }}
                />
                <label>Damage Type</label>
                <input
                  type="text"
                  name="damageType"
                  className="attack"
                  value={attack.damageType}
                  onChange={function(event) {
                    props.handleChangeAttack(event, idx);
                  }}
                />
                <label>Range</label>
                <input
                  type="number"
                  name="attackRange"
                  className="attack smallInput"
                  value={attack.attackRange}
                  onChange={function(event) {
                    props.handleChangeAttack(event, idx);
                  }}
                />
                ft
                {idx > 0 && (
                  <button type="button" onClick={props.removeAttack.bind(null, idx)}>
                    Remove attack
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="featsAndTraits">
        <h3>Features and Traits: </h3>
        <textarea
          maxLength="1600"
          name="features"
          className="feats"
          value={props.features}
          onChange={props.handleChange}
        />
      </div>
      <div className="deathSavesWrapper">
        <h3>Death Saves</h3>
        <ul>
          <li>
            <label>Successes</label>
            <input
              type="hidden"
              name="dsSuccesses"
              value={props.dsSuccesses}
              onChange={props.handleChange}
            />
            <input
              type="checkbox"
              name="dsSuccess1"
              className="dsSuccess"
              checked={props.deathSaves('dsSuccess1')}
              onChange={props.handleDeathSaves}
            />
            <input
              type="checkbox"
              name="dsSuccess2"
              className="dsSuccess"
              checked={props.deathSaves('dsSuccess2')}
              onChange={props.handleDeathSaves}
            />
            <input
              type="checkbox"
              name="dsSuccess3"
              className="dsSuccess"
              checked={props.deathSaves('dsSuccess3')}
              onChange={props.handleDeathSaves}
            />
          </li>
          <li>
            <label>Fails</label>
            <input
              type="hidden"
              name="dsFails"
              value={props.dsFails}
              onChange={props.handleChange}
            />
            <input
              type="checkbox"
              name="dsFail1"
              className="dsFail"
              checked={props.deathSaves('dsFail1')}
              onChange={props.handleDeathSaves}
            />
            <input
              type="checkbox"
              name="dsFail2"
              className="dsFail"
              checked={props.deathSaves('dsFail2')}
              onChange={props.handleDeathSaves}
            />
            <input
              type="checkbox"
              name="dsFail3"
              className="dsFail"
              checked={props.deathSaves('dsFail3')}
              onChange={props.handleDeathSaves}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CombatStats;
