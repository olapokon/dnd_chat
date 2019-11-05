import React from 'react';

function ClassLevel(props) {
  return (
    <div className="character">
      <div className="classLevel">
        <h3 className="heading classLevel__heading heading--3"> Class and Level </h3>
        <ul>
          {props.charClassArray.map((char, idx) => {
            return (
              <li key={idx}>
                <div>
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
                      className="btn btn__addClass btn--dark "
                      onClick={props.addClass}
                    >
                      Add class
                    </button>
                  )}
                  {idx > 0 && (
                    <button
                      type="button"
                      className="btn btn__removeClass btn--danger "
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
      <div className="experience">
        <label className="label totalLevel__label">Total Level:</label>
        <input
          className="input totalLevel__input input--small input--clear"
          type="number"
          name="totalLevel"
          value={props.charClassArray[0].level && props.calculateTotalLevel()}
          readOnly
        />
        <div>
          <div>
            <label className="label experience__label">Experience:</label>
            <input
              type="number"
              className="input experience__input input--mid  input--btmBorder"
              name="exp"
              value={props.exp}
              onChange={props.handleChange}
            />
          </div>
          <div>
            <label className="label addExp__label">Add Experience:</label>
            <input
              type="number"
              name="expAdd"
              className="input addExp__input input--mid  input--btmBorder"
              value={props.expAdd}
              onChange={props.handleChange}
            />
            <button
              type="button"
              className="btn addExp__btn btn--dark "
              onClick={props.addExperience}
            >
              Add experience
            </button>
          </div>
          <div>
            <label className="label nextLevelExp__label">Experience To Next Level:</label>
            <input
              type="number"
              className="input nextLevelExp__input input--big input--clear"
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
