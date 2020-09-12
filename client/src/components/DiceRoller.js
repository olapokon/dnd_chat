import React, { Component } from 'react';
import d4 from '../img/d4.png';
import d6 from '../img/d6.png';
import d8 from '../img/d8.png';
import d10 from '../img/d10.png';
import d12 from '../img/d12.png';
import d20 from '../img/d20.png';
import d100 from '../img/d100.png';

class DiceRoller extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dice: [
				{
					number: '',
					die: 4,
					modifier: '',
				},
				{
					number: '',
					die: 6,
					modifier: '',
				},
				{
					number: '',
					die: 8,
					modifier: '',
				},
				{
					number: '',
					die: 10,
					modifier: '',
				},
				{
					number: '',
					die: 12,
					modifier: '',
				},
				{
					number: '',
					die: 20,
					modifier: '',
				},
				{
					number: '',
					die: 100,
					modifier: '',
				},
			],
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleRoll = this.handleRoll.bind(this);
	}

	showDieImage(die, index) {
		if (die === 4) {
			return (
				<input
					type="image"
					src={d4}
					alt={'d' + die}
					className="diceRoller__button"
					key={die}
					name={die}
					onClick={function (event) {
						this.handleRoll(event, index);
					}.bind(this)}
				/>
			);
		}
		if (die === 6) {
			return (
				<input
					type="image"
					src={d6}
					alt={'d' + die}
					className="diceRoller__button"
					key={die}
					name={die}
					onClick={function (event) {
						this.handleRoll(event, index);
					}.bind(this)}
				/>
			);
		}
		if (die === 8) {
			return (
				<input
					type="image"
					src={d8}
					alt={'d' + die}
					className="diceRoller__button"
					key={die}
					name={die}
					onClick={function (event) {
						this.handleRoll(event, index);
					}.bind(this)}
				/>
			);
		}
		if (die === 10) {
			return (
				<input
					type="image"
					src={d10}
					alt={'d' + die}
					className="diceRoller__button"
					key={die}
					name={die}
					onClick={function (event) {
						this.handleRoll(event, index);
					}.bind(this)}
				/>
			);
		}
		if (die === 12) {
			return (
				<input
					type="image"
					src={d12}
					alt={'d' + die}
					className="diceRoller__button"
					key={die}
					name={die}
					onClick={function (event) {
						this.handleRoll(event, index);
					}.bind(this)}
				/>
			);
		}
		if (die === 20) {
			return (
				<input
					type="image"
					src={d20}
					alt={'d' + die}
					className="diceRoller__button"
					key={die}
					name={die}
					onClick={function (event) {
						this.handleRoll(event, index);
					}.bind(this)}
				/>
			);
		}
		if (die === 100) {
			return (
				<input
					type="image"
					src={d100}
					alt={'d' + die}
					className="diceRoller__button"
					key={die}
					name={die}
					onClick={function (event) {
						this.handleRoll(event, index);
					}.bind(this)}
				/>
			);
		}
	}

	handleChange(event, index, field) {
		const target = event.target;
		const value = target.value;
		const newArray = [...this.state.dice];
		const newElement = newArray[index];
		newElement[field] = value;
		newArray.splice(index, 1, newElement);
		this.setState({
			dice: newArray,
		});
	}

	handleRoll(event, index) {
		const die = event.target.name;
		const numberOfDice = Math.floor(this.state.dice[index].number) || 1;
		const modifier = Math.floor(this.state.dice[index].modifier);
		const dieType = `d${this.state.dice[index].die}`;
		const rollsArray = [];
		if (numberOfDice >= 1) {
			for (let i = 0; i < numberOfDice; i++) {
				const roll = Math.floor(Math.random() * die + 1);
				rollsArray.push(roll);
			}
			const totalRoll = rollsArray.reduce(function (acc, el) {
				return acc + el;
			});
			const finalRoll = {
				dieType,
				rolls: rollsArray,
				modifier,
				total: totalRoll + +modifier,
			};
			//console.log(finalRoll);

			//send roll result to chatroom if applicable
			if (this.props.handleDiceRoll) {
				this.props.handleDiceRoll(finalRoll);
			}
		}
	}

	render() {
		return (
			<>
				{this.state.dice.map((die, index) => {
					return (
						<div className="diceRoller" key={`${die.die}Wrapper`}>
							<input
								className="diceRoller__input"
								key={`${die.die}Number`}
								name={`${die.die}Number`}
								type="number"
								value={die.number}
								onChange={function (event) {
									this.handleChange(event, index, 'number');
								}.bind(this)}
							/>

							{this.showDieImage(die.die, index)}

							<input
								className="diceRoller__input"
								key={`${die.die}Modifier`}
								name={`${die.die}Modifier`}
								type="number"
								value={die.modifier}
								onChange={function (event) {
									this.handleChange(event, index, 'modifier');
								}.bind(this)}
							/>
						</div>
					);
				})}
			</>
		);
	}
}

export default DiceRoller;
