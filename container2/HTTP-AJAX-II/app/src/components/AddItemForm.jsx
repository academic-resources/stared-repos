import React from 'react';

class AddItemForm extends React.Component {
  render() {
    return (
      <div className="form-container">
        <h2>Add New Item</h2>
        <form>
          <input
            type="text"
            name="name"
            placeholder="name"
          />
          <div className="baseline" />

          <input
            type="number"
            name="price"
            placeholder="Price"
          />
          <div className="baseline" />

          <input
            type="text"
            name="imageUrl"
            placeholder="Image"
          />
          <div className="baseline" />

          <input
            type="text"
            name="description"
            placeholder="Description"
          />
          <div className="baseline" />

          <input
            type="text"
            name="shipping"
            placeholder="Shipping"
          />
          <div className="baseline" />

          <button className="md-button form-button">Add New Item</button>
        </form>
      </div>
    );
  }
}

export default AddItemForm;