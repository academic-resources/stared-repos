import React from 'react';

class UpdateItemForm extends React.Component {
  render() {
    return (
      <div>
        <h2>Update Item</h2>
        <form className="form-container">
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

          <button className="md-button form-button">Update Item</button>
        </form>
      </div>
    );
  }
}

export default UpdateItemForm;