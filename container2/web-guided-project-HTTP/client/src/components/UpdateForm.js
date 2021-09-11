import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
  name: "",
  price: "",
  imageUrl: "",
  description: "",
  shipping: ""
};

const UpdateForm = props => {
  const { push } = useHistory();
  const [item, setItem] = useState(initialItem);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3333/itemById/${id}`)
    .then(res => setItem(res.data))
    .catch(err => console.log(err));
  }, [id]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "price") {
      value = parseInt(value, 10);
    }

    setItem({
      ...item,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios.put(`http://localhost:3333/items/${id}`, item)
    .then((res) => {
      props.setItems(res.data); // update application level state (prop passed in from the Route!)
      push(`/item-list/${id}`); // direct the user to the single item view for the updated item
    })
    .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={changeHandler}
          placeholder="name"
          value={item.name}
        />
        <div className="baseline" />

        <input
          type="number"
          name="price"
          onChange={changeHandler}
          placeholder="Price"
          value={item.price}
        />
        <div className="baseline" />

        <input
          type="string"
          name="imageUrl"
          onChange={changeHandler}
          placeholder="Image"
          value={item.imageUrl}
        />
        <div className="baseline" />

        <input
          type="string"
          name="description"
          onChange={changeHandler}
          placeholder="Description"
          value={item.description}
        />
        <div className="baseline" />

        <input
          type="string"
          name="shipping"
          onChange={changeHandler}
          placeholder="Shipping"
          value={item.shipping}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;