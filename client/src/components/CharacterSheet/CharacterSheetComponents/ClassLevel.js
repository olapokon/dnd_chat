import React from 'react';

function ClassLevel(props) {
  return (
    <div className="classLevel">
      <div>
        <h3> Class and Level </h3>
        <ul>
          {props.charClassArray.map((char, idx) => {
            return (
              <li key={idx}>
                <label>
                  Class
                  <input
                    type="text"
                    name="class"
                    value={char.class}
                    onChange={function(event) {
                      props.handleChangeClass(event, idx);
                    }}
                  />
                </label>
                <label>
                  Level
                  <input
                    className="smallInput"
                    type="number"
                    name="level"
                    value={char.level}
                    onChange={function(event) {
                      props.handleChangeClass(event, idx);
                    }}
                  />
                </label>
                {idx === 0 && (
                  <button type="button" onClick={props.addClass}>
                    Add class
                  </button>
                )}
                {idx > 0 && (
                  <button type="button" onClick={props.removeClass.bind(null, idx)}>
                    Remove class
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        <div className="expWrapper">
          <label>
            Total Level
            <input
              className="smallInput"
              type="number"
              name="totalLevel"
              value={props.charClassArray[0].level && props.calculateTotalLevel()}
              readOnly
            />
          </label>
          <div>
            <label>
              Experience
              <input type="number" name="exp" value={props.exp} onChange={props.handleChange} />
            </label>
            <div>
              <label>
                Add Experience
                <input
                  type="number"
                  name="expAdd"
                  value={props.expAdd}
                  onChange={props.handleChange}
                />
              </label>
              <button type="button" onClick={props.addExperience}>
                Add experience
              </button>
            </div>
            <div>
              <label>
                Experience To Next Level
                <input type="number" name="exp" value={props.calculateExpToNextLevel()} readOnly />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassLevel;
