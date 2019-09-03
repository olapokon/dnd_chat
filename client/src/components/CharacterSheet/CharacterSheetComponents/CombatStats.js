import React from 'react';

function CombatStats(props) {
  return (
    <div className="combatWrapper wrapperSettings leftFloat">
      <h3>Combat</h3>
      <div className="acStatsWrapper leftFloat ">
        <ul className="acStatsList row">
          <li>
            <label>
              Armor Class:
              <div>
                <input
                  type="number"
                  name="armorClass"
                  className="smallInput form-control edgeBox"
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
                  className="smallInput form-control edgeBox"
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
                  className="smallInput form-control edgeBox"
                  value={props.speed}
                  onChange={props.handleChange}
                />
              </div>
            </label>
          </li>
        </ul>
      </div>
      <div className="wrapperSettings">
        Hit Points
        <ul className="hpList">
          <li>
          <div className="row">
            <label>Maximum</label>
            <input
              type="number"
              name="hpMax"
              className="midInput form-control edgeBox"
              value={props.hpMax}
              onChange={props.handleChange}
            />
            </div>
          </li>
          <li>
          <div className="row">
            <label>Current</label>
            <input
              type="number"
              name="hpCurrent"
              className="midInput form-control edgeBox"
              value={props.hpCurrent}
              onChange={props.handleChange}
            />
            </div>
          </li>
          <li>
          <div className="row">
            <label>Temporary</label>
            <input
              type="number"
              name="hpTemp"
              id="hpTemp"
              className="midInput form-control edgeBox"
              value={props.hpTemp}
              onChange={props.handleChange}
            />
            </div>
          </li>
        </ul>
      </div>
      <div className="attackWrapperTable">
        <h4> Attack and Spellcasting</h4>
        
        <table className="attacksTable">
          <thead>
            <tr>
              <th>Name(item/spell)</th>
              <th className="smallCol wrapHeader">Attack Bonus</th>
              <th className="dmgCol">Damage (No/Die)</th>
              <th className="dmgCol">Sec Effect (No/Die)</th>
              <th className="smallCol wrapHeader">Damage Bonus</th>
              <th>Range</th>
              <th></th>
              <th className="rollAttackHeader"></th>
            </tr>
          </thead>
          <tbody>
          {props.attacksArray.map((attack, idx) => {
            return (
              <tr key={idx}>
              <td>
                
                <input
                  type="text"
                  name="attackName"
                  className="attackName btmBorder bigInput form-control"
                  value={attack.attackName}
                  onChange={function(event) {
                    props.handleChangeAttack(event, idx);
                  }}
                />
                </td>
                <td>
                <input
                  type="number"
                  name="attackBonus"
                  className="attackBonus smallInput form-control edgeBox"
                  value={attack.attackBonus}
                  onChange={function(event) {
                    props.handleChangeAttack(event, idx);
                  }}
                />
                </td>
                <td className="attackCol">
                <div className="row">
                <input
                  type="number"
                  name="atkDmgDno"
                  className="attackDice smallInput form-control edgeBox"
                  value={attack.atkDmgDno}
                  onChange={function(event) {
                    props.handleChangeAttack(event, idx);
                  }}
                />
                <select
                  name="atkDmgDice"
                  className="attackDice btn btn-light lightDropDown"
                  value={attack.atkDmgDice}
                  onChange={function(event) {
                    props.handleChangeAttack(event, idx);
                  }}
                >
                  <option value="" disabled>
                    Die
                  </option>
                  <option value="d4">d4</option>
                  <option value="d6">d6</option>
                  <option value="d8">d8</option>
                  <option value="d10">d10</option>
                  <option value="d12">d12</option>
                  <option value="d20">d20</option>
                </select>
                </div>
                </td>
                <td className="attackCol">
                <div className="row">
                <input
                  type="number"
                  name="atkDmgDnoSec"
                  className="attackDice smallInput form-control edgeBox"
                  value={attack.atkDmgDnoSec}
                  onChange={function(event) {
                    props.handleChangeAttack(event, idx);
                  }}
                />
                <select
                  name="atkDmgDiceSec"
                  className="attackDice btn btn-light lightDropDown"
                  value={attack.atkDmgDiceSec}
                  onChange={function(event) {
                    props.handleChangeAttack(event, idx);
                  }}
                >
                  <option value="" disabled>
                    Die
                  </option>
                  <option value="d4">d4</option>
                  <option value="d6">d6</option>
                  <option value="d8">d8</option>
                  <option value="d10">d10</option>
                  <option value="d12">d12</option>
                  <option value="d20">d20</option>
                </select>
                </div>
                </td>
                <td >
                <input
                  type="number"
                  name="damageBonus"
                  className="dmgBonus smallInput form-control edgeBox"
                  value={attack.damageBonus}
                  onChange={function(event) {
                    props.handleChangeAttack(event, idx);
                  }}
                />
                </td>
                
                <td>
                <div className="row">
                <input
                  type="number"
                  name="attackRange"
                  className="atkRange midInput form-control edgeBox"
                  value={attack.attackRange}
                  onChange={function(event) {
                    props.handleChangeAttack(event, idx);
                  }}
                />
                </div>
                </td>
                <td>
                {idx > 0 && (
                  <button type="button" className="btn btn-danger edgeBtn" onClick={props.removeAttack.bind(null, idx)}>
                    -
                  </button>
                )}
                 {idx == 0 && (
                  <button type="button" className="btn btn-dark edgeBtn" onClick={props.addAttack}>
                    +
                  </button>
                  )}
                </td>
                <td className="rollAttack">
                </td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
      <div className="featsAndTraits">
        <h3>Features and Traits: </h3>
        <textarea
          name="features"
          id="feats"
          className="feats form-control tArea"
          value={props.features}
          onChange={props.handleChange}
        />
      </div>
      <div className="deathSavesWrapper leftFload">
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
