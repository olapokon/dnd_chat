import React from 'react';

function PersonalityBackground(props) {
  return (
    <div className="container personalityBackground">
      <div className="container background">
        <h3 className="heading background__heading">Background</h3>
        <textarea
          maxLength="1600"
          name="background"
          className="tArea background__tArea tArea--noMargin"
          value={props.background}
          onChange={props.handleChange}
        />
      </div>
      <div className="container personality">
        <h3 className="heading personality__heading"> Personality </h3>
        <label className="label personality__label">
          Traits
          <textarea
            maxLength="1600"
            name="personality"
            className="tArea personality__tArea"
            value={props.personality}
            onChange={props.handleChange}
          />
        </label>
        <label className="label personality__label">
          Ideals
          <textarea
            maxLength="1600"
            name="ideals"
            className="tArea personality__tArea"
            value={props.ideals}
            onChange={props.handleChange}
          />
        </label>
        <label className="label personality__label">
          Bonds
          <textarea
            maxLength="1600"
            name="bonds"
            className="tArea personality__tArea"
            value={props.bonds}
            onChange={props.handleChange}
          />
        </label>
        <label className="label personality__label">
          Flaws
          <textarea
            maxLength="1600"
            name="flaws"
            className="tArea personality__tArea tArea--noMargin"
            value={props.flaws}
            onChange={props.handleChange}
          />
        </label>
      </div>
    </div>
  );
}

export default PersonalityBackground;
