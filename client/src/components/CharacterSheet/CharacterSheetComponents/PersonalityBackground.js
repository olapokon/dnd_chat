import React from 'react';

function PersonalityBackground(props) {
  return (
    <div className="personalityBackground wrapperSettings leftFloat">
      <div>
        <div>
          <h3>Background: </h3>
          <textarea
            maxLength="1600"
            name="background"
            className="noMargin"
            value={props.background}
            onChange={props.handleChange}
          />
        </div>
        <h3> Personality </h3>
        <label>
          Traits:
          <textarea
            maxLength="1600"
            name="personality"
            value={props.personality}
            onChange={props.handleChange}
          />
        </label>
        <label>
          Ideals:
          <textarea
            maxLength="1600"
            name="ideals"
            value={props.ideals}
            onChange={props.handleChange}
          />
        </label>
        <label>
          Bonds:
          <textarea
            maxLength="1600"
            name="bonds"
            value={props.bonds}
            onChange={props.handleChange}
          />
        </label>
        <label>
          Flaws:
          <textarea
            maxLength="1600"
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
