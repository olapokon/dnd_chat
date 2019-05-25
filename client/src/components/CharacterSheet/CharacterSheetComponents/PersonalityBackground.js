import React from 'react';

function PersonalityBackground(props) {
  return (
    <div className="personalityBackground wrapperSettings leftFloat">
      <div>
        <div>
          <h3>Background: </h3>
          <textarea
            name="background"
            className="noMargin"
            value={props.background}
            onChange={props.handleChange}
          />
        </div>
        <h3> Personality </h3>
        <label>
          Traits:
          <textarea name="personality" value={props.personality} onChange={props.handleChange} />
        </label>
        <label>
          Ideals:
          <textarea name="ideals" value={props.ideals} onChange={props.handleChange} />
        </label>
        <label>
          Bonds:
          <textarea name="bonds" value={props.bonds} onChange={props.handleChange} />
        </label>
        <label>
          Flaws:
          <textarea
            name="flaws"
            className="noMargin"
            value={props.flaws}
            onChange={props.handleChange}
          />
        </label>
      </div>
    </div>
  );
}

export default PersonalityBackground;
