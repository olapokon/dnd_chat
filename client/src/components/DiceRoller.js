import React, { Component } from 'react';
import './DiceRoller.css';

class DiceRoller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: [
        {
          number: '',
          die: 4,
          modifier: ''
        },
        {
          number: '',
          die: 6,
          modifier: ''
        },
        {
          number: '',
          die: 8,
          modifier: ''
        },
        {
          number: '',
          die: 10,
          modifier: ''
        },
        {
          number: '',
          die: 12,
          modifier: ''
        },
        {
          number: '',
          die: 20,
          modifier: ''
        },
        {
          number: '',
          die: 100,
          modifier: ''
        }
      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRoll = this.handleRoll.bind(this);
  }

  handleChange(event, index, field) {
    const target = event.target;
    const value = target.value;
    const newArray = [...this.state.dice];
    const newElement = newArray[index];
    newElement[field] = value;
    newArray.splice(index, 1, newElement);
    this.setState({
      dice: newArray
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
      const totalRoll = rollsArray.reduce(function(acc, el) {
        return acc + el;
      });
      const finalRoll = {
        dieType,
        rolls: rollsArray,
        modifier,
        total: totalRoll + +modifier
      };
      console.log(finalRoll);

      //send roll result to chatroom if applicable
      if (this.props.handleDiceRoll) {
        this.props.handleDiceRoll(finalRoll);
      }
    }
  }

  render() {
    return (
      <div id="diceRoller" className="diceRoller">
        {this.state.dice.map((die, index) => {
          return (
            <div className="inputDiceWrapper" key={`${die.die}Wrapper`}>
              <input
                className="diceInput"
                key={`${die.die}Number`}
                name={`${die.die}Number`}
                type="number"
                value={die.number}
                onChange={function(event) {
                  this.handleChange(event, index, 'number');
                }.bind(this)}
              />
              <button
                className="diceButton"
                key={die.die}
                name={die.die}
                type="button"
                onClick={function(event) {
                  this.handleRoll(event, index);
                }.bind(this)}
              >
                {die.die}
              </button>
              <input
                className="diceInput"
                key={`${die.die}Modifier`}
                name={`${die.die}Modifier`}
                type="number"
                value={die.modifier}
                onChange={function(event) {
                  this.handleChange(event, index, 'modifier');
                }.bind(this)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default DiceRoller;
