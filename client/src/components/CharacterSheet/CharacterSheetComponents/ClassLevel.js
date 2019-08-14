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
              <div className="row">
                <label>
                  Class:
                </label>
                  <input
                    type="text"
                    name="class"
                    className="btmBorder bigInput form-control"
                    value={char.class}
                    onChange={function(event) {
                      props.handleChangeClass(event, idx);
                    }}
                  />
                <label>
                  Level:
                </label>
                  <input
                    className="smallInput edgeBox form-control"
                    type="number"
                    name="level"
                    value={char.level}
                    onChange={function(event) {
                      props.handleChangeClass(event, idx);
                    }}
                  />
                {idx === 0 && (
                  <button type="button" className="btn btn-dark edgeBtn" onClick={props.addClass}>
                    Add class
                  </button>
                )}
                {idx > 0 && (
                  <button type="button" className="btn btn-danger edgeBtn" onClick={props.removeClass.bind(null, idx)}>
                    -
                  </button>
                )}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="expWrapper">
          <label>
            Total Level:
          </label>
            <input
              className="smallInput"
              type="number"
              name="totalLevel"
              value={props.charClassArray[0].level && props.calculateTotalLevel()}
              readOnly
            />
          <div>
          <div className="row">
            <label>
              Experience:</label>
              <input type="number" className="midInput edgeBox form-control" name="exp" value={props.exp} onChange={props.handleChange} />
            </div>
            <div className="row">
              <label>
                Add Experience:
              </label>
                <input
                  type="number"
                  name="expAdd"
                  className="midInput edgeBox form-control"
                  value={props.expAdd}
                  onChange={props.handleChange}
                />
              <button type="button" className="btn btn-dark edgeBtn" onClick={props.addExperience}>
                Add experience
              </button>
            </div>
            <div className="row">
              <label>
                Experience To Next Level:
              </label>
                <input type="number" name="exp" value={props.calculateExpToNextLevel()} readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassLevel;
