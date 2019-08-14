import React from 'react';

function Inventory(props) {
  return (
    <div className="invWrapper wrapperSettings leftFloat">
      <div>
        <h3> Equipment </h3>
        <label>
          Equiped Items:
          <textarea
            name="equipment"
            className="equipment equipedItems form-control tArea"
            value={props.equipment}
            onChange={props.handleChange}
          />
        </label>
        <label>
          Inventory:
          <textarea
            name="inventory"
            className="inventory form-control tArea"
            value={props.inventory}
            onChange={props.handleChange}
          />
        </label>
        <div className="moneyWrapper">
          <h3> Money </h3>
          <div className="row">
          <label>
            CP:
            <input
              type="number"
              name="copper"
              className="equipment midInput form-control edgeBox"
              value={props.copper}
              onChange={props.handleChange}
            />
          </label>
          <label>
            SP:
            <input
              type="number"
              name="silver"
              className="equipment midInput form-control edgeBox"
              value={props.silver}
              onChange={props.handleChange}
            />
          </label>
          <label>
            EP:
            <input
              type="number"
              name="electrum"
              className="equipment midInput form-control edgeBox"
              value={props.electrum}
              onChange={props.handleChange}
            />
          </label>
          <label>
            GP:
            <input
              type="number"
              name="gold"
              className="equipment midInput form-control edgeBox"
              value={props.gold}
              onChange={props.handleChange}
            />
          </label>
          <label>
            PP:
            <input
              type="number"
              name="platinum"
              className="equipment midInput form-control edgeBox"
              value={props.platinum}
              onChange={props.handleChange}
            />
          </label>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
