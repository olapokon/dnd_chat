import React from 'react';

function Inventory(props) {
  return (
    <div className="container inventoryFull">
      <div className="container equipment">
        <h3 className="heading equipment__heading heading--3"> Equipment </h3>
        <div className="container inventory">
          <label className="label equipment__label">Equiped Items</label>

          <textarea
            name="equipment"
            className="tArea equipment__tArea"
            value={props.equipment}
            onChange={props.handleChange}
          />
        </div>
        <div className="container inventory">
          <label className="label equipment__label">Inventory</label>
          <textarea
            name="inventory"
            className="tArea equipment__tArea"
            value={props.inventory}
            onChange={props.handleChange}
          />
        </div>
      </div>
      <div className="container money">
        <h3 className="heading money__heading heading--3"> Money </h3>
        <label className="label money__label">
          CP
          <input
            type="number"
            name="copper"
            className="input money__input input--mid "
            value={props.copper}
            onChange={props.handleChange}
          />
        </label>
        <label className="label money__label">
          SP
          <input
            type="number"
            name="silver"
            className="input money__input input--mid "
            value={props.silver}
            onChange={props.handleChange}
          />
        </label>
        <label className="label money__label">
          EP
          <input
            type="number"
            name="electrum"
            className="input money__input input--mid "
            value={props.electrum}
            onChange={props.handleChange}
          />
        </label>
        <label className="label money__label">
          GP
          <input
            type="number"
            name="gold"
            className="input money__input input--mid "
            value={props.gold}
            onChange={props.handleChange}
          />
        </label>
        <label className="label money__label">
          PP
          <input
            type="number"
            name="platinum"
            className="input money__input input--mid "
            value={props.platinum}
            onChange={props.handleChange}
          />
        </label>
      </div>
    </div>
  );
}

export default Inventory;
