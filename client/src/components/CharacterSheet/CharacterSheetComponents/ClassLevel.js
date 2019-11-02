import React from 'react';

function ClassLevel(props) {
  return (
    <div className="container character">
      <div className="container classLevel">
        <h3 className="heading classLevel__heading"> Class and Level </h3>
        <ul>
          {props.charClassArray.map((char, idx) => {
            return (
              <li key={idx}>
                <div className="row classLevel__row">
                  <label className="label classLevel__label">Class:</label>
                  <input
                    type="text"
                    name="class"
                    className="input classLevel__input input--big input--btmBorder"
                    value={char.class}
                    onChange={function(event) {
                      props.handleChangeClass(event, idx);
                    }}
                  />
                  <label className="label classLevel__label">Level:</label>
                  <input
                    className="input classLevel__input input--small input--btmBorder input--number"
                    type="number"
                    name="level"
                    value={char.level}
                    onChange={function(event) {
                      props.handleChangeClass(event, idx);
                    }}
                  />
                  {idx === 0 && (
                    <button
                      type="button"
                      className="btn btn__addClass btn--dark btn--edge"
                      onClick={props.addClass}
                    >
                      Add class
                    </button>
                  )}
                  {idx > 0 && (
                    <button
                      type="button"
                      className="btn btn__removeClass btn--red btn--edge"
                      onClick={props.removeClass.bind(null, idx)}
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
      <div className="container experience">
        <label className="label totalLevel__label">Total Level:</label>
        <input
          className="input totalLevel__input input--small input--readonly input--noBorder"
          type="number"
          name="totalLevel"
          value={props.charClassArray[0].level && props.calculateTotalLevel()}
          readOnly
        />
        <div>
          <div className="row experience__row">
            <label className="label experience__label">Experience:</label>
            <input
              type="number"
              className="input experience__input input--mid input--edge input--btmBorder"
              name="exp"
              value={props.exp}
              onChange={props.handleChange}
            />
          </div>
          <div className="row">
            <label className="label addExp__label">Add Experience:</label>
            <input
              type="number"
              name="expAdd"
              className="input addExp__input input--mid input--edge input--btmBorder"
              value={props.expAdd}
              onChange={props.handleChange}
            />
            <button
              type="button"
              className="btn addExp__btn btn--dark btn--edge"
              onClick={props.addExperience}
            >
              Add experience
            </button>
          </div>
          <div className="row nextLevelExp__row">
            <label className="label nextLevelExp__label">Experience To Next Level:</label>
            <input
              type="number"
              className="input nextLevelExp__input input--big input--readonly input--noBorder"
              name="exp"
              value={props.calculateExpToNextLevel()}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassLevel;
