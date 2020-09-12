import React from 'react';

function CombatStats(props) {
	return (
		<div className="combat">
			<h3 className="heading combat__heading heading--3">Combat</h3>
			<div className="combatStats">
				<div className="AcInitSpeed">
					<h4 className="heading combatStats__heading heading--4">Combat Stats</h4>
					<div className="armorClass">
						<label className="label combat__label">
							Armor Class
							<div>
								<input
									type="number"
									name="armorClass"
									className="input armorClass__input input--large "
									value={props.armorClass}
									onChange={props.handleChange}
								/>
							</div>
						</label>
					</div>
					<div className="initiative">
						<label className="label combat__label">
							Initiative
							<div>
								<input
									type="number"
									name="initiative"
									className="input initiative__input input--large "
									value={props.initiative}
									onChange={props.handleChange}
								/>
							</div>
						</label>
					</div>
					<div className="speed">
						<label className="label combat__label">
							Speed
							<div>
								<input
									type="number"
									name="speed"
									className="input speed__input input--large "
									value={props.speed}
									onChange={props.handleChange}
								/>
							</div>
						</label>
					</div>
				</div>
				<div className="hitPoints">
					<h4 className="heading hitPoints__heading heading--4">Hit Points</h4>
					<div>
						<label className="label combat__label">Maximum</label>
						<input
							type="number"
							name="hpMax"
							className="input maxHp__input input--mid "
							value={props.hpMax}
							onChange={props.handleChange}
						/>
					</div>
					<div>
						<label className="label combat__label">Current</label>
						<input
							type="number"
							name="hpCurrent"
							className="input currentHp__input input--mid "
							value={props.hpCurrent}
							onChange={props.handleChange}
						/>
					</div>
					<div>
						<label className="label combat__label">Temporary</label>
						<input
							type="number"
							name="hpTemp"
							className="input tempHp__input input--mid "
							value={props.hpTemp}
							onChange={props.handleChange}
						/>
					</div>
				</div>
			</div>
			<div className="attacks">
				<h4 className="heading attacks__heading heading--4"> Attack and Spellcasting</h4>

				<table className="attackTable">
					<thead>
						<tr>
							<th className="tableHeader attackTable__tableHeader">
								Name(item/spell)
							</th>
							<th className="tableHeader attackTable__tableHeader tableHeader--small tableHeader--wrap">
								Attack Bonus
							</th>
							<th className="tableHeader attackTable__tableHeader tableHeader--mid tableHeader--wrap">
								Damage (No/Die)
							</th>
							<th className="tableHeader attackTable__tableHeader tableHeader--mid tableHeader--wrap">
								Sec Effect (No/Die)
							</th>
							<th className="tableHeader attackTable__tableHeader tableHeader--small tableHeader--wrap">
								Damage Bonus
							</th>
							<th className="tableHeader attackTable__tableHeader">Range</th>
							<th className="tableHeader attackTable__tableHeader"></th>
							<th className="tableHeader attackTable__tableHeader"></th>
						</tr>
					</thead>
					<tbody>
						{props.attacksArray.map((attack, idx) => {
							return (
								<tr key={idx}>
									<td className="column attackTable__column">
										<input
											type="text"
											name="attackName"
											className="input input__attackName input--big input--btmBorder"
											value={attack.attackName}
											onChange={function (event) {
												props.handleChangeAttack(event, idx);
											}}
										/>
									</td>
									<td className="column attackTable__column">
										<input
											type="number"
											name="attackBonus"
											className="input input__attackBonus input--small  input--btmBorder"
											value={attack.attackBonus}
											onChange={function (event) {
												props.handleChangeAttack(event, idx);
											}}
										/>
									</td>
									<td className="column attackTable__column">
										<input
											type="number"
											name="atkDmgDno"
											className="input input__attackDice input--small  input--btmBorder"
											value={attack.atkDmgDno}
											onChange={function (event) {
												props.handleChangeAttack(event, idx);
											}}
										/>
										<select
											name="atkDmgDice"
											className="select select__dmgDice btn--white btn--dropDown btn--btmBorder"
											value={attack.atkDmgDice}
											onChange={function (event) {
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
									</td>
									<td className="column attackTable__column">
										<input
											type="number"
											name="atkDmgDnoSec"
											className="input input__attackDice input--small  input--btmBorder"
											value={attack.atkDmgDnoSec}
											onChange={function (event) {
												props.handleChangeAttack(event, idx);
											}}
										/>
										<select
											name="atkDmgDiceSec"
											className="select select__dmgDice btn--white btn--dropDown btn--btmBorder"
											value={attack.atkDmgDiceSec}
											onChange={function (event) {
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
									</td>
									<td className="column attackTable__column">
										<input
											type="number"
											name="damageBonus"
											className="input input__dmgBonus input--small  input--btmBorder"
											value={attack.damageBonus}
											onChange={function (event) {
												props.handleChangeAttack(event, idx);
											}}
										/>
									</td>

									<td className="column attackTable__column">
										<input
											type="number"
											name="attackRange"
											className="input input__atkRange input--mid  input--btmBorder"
											value={attack.attackRange}
											onChange={function (event) {
												props.handleChangeAttack(event, idx);
											}}
										/>
									</td>
									<td className="column attackTable__column">
										{idx > 0 && (
											<button
												type="button"
												className="btn btn__removeAtk btn--danger "
												onClick={props.removeAttack.bind(null, idx)}
											>
												-
											</button>
										)}
										{idx === 0 && (
											<button
												type="button"
												className="btn btn__addAtk btn--dark "
												onClick={props.addAttack}
											>
												+
											</button>
										)}
									</td>
									<td className="column attackTable__column"></td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className="featsAndTraits">
				<h4 className="heading featsAndTraits__heading heading--4">Features and Traits </h4>
				<textarea
					name="features"
					id="feats"
					className="tArea featsAndTraits__tArea"
					value={props.features}
					onChange={props.handleChange}
				/>
			</div>
			<div className="deathSaves">
				<h4 className="heading deathSaves__heading heading--4">Death Saves</h4>
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
							className="checkbox checkbox__dsSuccess"
							checked={props.deathSaves('dsSuccess1')}
							onChange={props.handleDeathSaves}
						/>
						<input
							type="checkbox"
							name="dsSuccess2"
							className="checkbox checkbox__dsSuccess"
							checked={props.deathSaves('dsSuccess2')}
							onChange={props.handleDeathSaves}
						/>
						<input
							type="checkbox"
							name="dsSuccess3"
							className="checkbox checkbox__dsSuccess"
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
							className="checkbox checkbox__dsFail"
							checked={props.deathSaves('dsFail1')}
							onChange={props.handleDeathSaves}
						/>
						<input
							type="checkbox"
							name="dsFail2"
							className="checkbox checkbox__dsFail"
							checked={props.deathSaves('dsFail2')}
							onChange={props.handleDeathSaves}
						/>
						<input
							type="checkbox"
							name="dsFail3"
							className="checkbox checkbox__dsFail"
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
