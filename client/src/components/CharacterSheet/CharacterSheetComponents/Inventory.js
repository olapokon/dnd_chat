import React from 'react';

function Inventory(props) {
  return (
    <div className="wrapperSettings leftFloat">
      <div>
        <h3> Equipment </h3>
        <label>
          Equiped Items:
          <textarea
            name="equipment"
            className="equipment"
            value={props.equipment}
            onChange={props.handleChange}
          />
        </label>
        <label>
          Inventory:
          <textarea
            name="inventory"
            className="inventory"
            value={props.inventory}
            onChange={props.handleChange}
          />
        </label>
        <div className="moneyWrapper">
          <h3> Money </h3>
          <label>
            CP:
            <input
              type="number"
              name="copper"
              className="equipment midInput"
              value={props.copper}
              onChange={props.handleChange}
            />
          </label>
          <label>
            SP:
            <input
              type="number"
              name="silver"
              className="equipment midInput"
              value={props.silver}
              onChange={props.handleChange}
            />
          </label>
          <label>
            EP:
            <input
              type="number"
              name="electrum"
              className="equipment midInput"
              value={props.electrum}
              onChange={props.handleChange}
            />
          </label>
          <label>
            GP:
            <input
              type="number"
              name="gold"
              className="equipment midInput"
              value={props.gold}
              onChange={props.handleChange}
            />
          </label>
          <label>
            PP:
            <input
              type="number"
              name="platinum"
              className="equipment midInput"
              value={props.platinum}
              onChange={props.handleChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
