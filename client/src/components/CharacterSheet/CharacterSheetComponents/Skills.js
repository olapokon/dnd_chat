import React from 'react';

const skills = [
  { name: 'acrobatics', displayName: 'Acrobatics', relatedAttribute: 'dex' },
  { name: 'animalHandling', displayName: 'Animal Handling', relatedAttribute: 'wis' },
  { name: 'arcana', displayName: 'Arcana', relatedAttribute: 'int' },
  { name: 'athletics', displayName: 'Athletics', relatedAttribute: 'str' },
  { name: 'deception', displayName: 'Deception', relatedAttribute: 'cha' },
  { name: 'history', displayName: 'History', relatedAttribute: 'int' },
  { name: 'insight', displayName: 'Insight', relatedAttribute: 'wis' },
  { name: 'intimidation', displayName: 'Intimidation', relatedAttribute: 'cha' },
  { name: 'investigation', displayName: 'Investigation', relatedAttribute: 'int' },
  { name: 'medicine', displayName: 'Medicine', relatedAttribute: 'wis' },
  { name: 'nature', displayName: 'Nature', relatedAttribute: 'int' },
  { name: 'perception', displayName: 'Perception', relatedAttribute: 'wis' },
  { name: 'performance', displayName: 'Performance', relatedAttribute: 'cha' },
  { name: 'persuasion', displayName: 'Persuasion', relatedAttribute: 'cha' },
  { name: 'religion', displayName: 'Religion', relatedAttribute: 'int' },
  { name: 'sleightOfHand', displayName: 'Sleight of Hand', relatedAttribute: 'dex' },
  { name: 'stealth', displayName: 'Stealth', relatedAttribute: 'dex' },
  { name: 'survival', displayName: 'Survival', relatedAttribute: 'wis' }
];

function Skills(props) {
  return (
    <div className="skills leftFloat">
      <h3> Skills</h3>
      <ul>
        {skills.map(skill => {
          return (
            <li key={skill.name}>
              <input
                className="skillBox"
                type="checkbox"
                name={skill.name}
                onChange={props.handleChange}
                checked={props.proficienciesArray.includes(skill.name)}
              />
              <input
                className="skill smallInput"
                type="number"
                value={props.calculateModifier(
                  props[skill.relatedAttribute],
                  props.proficienciesArray.includes(skill.name)
                )}
                readOnly
              />
              <label>{skill.displayName}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Skills;
