
import "./AddInventory.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import arrow from "../../assets/images/arrow_back-24px.svg";
import axios from "axios";
import error from "../../assets/images/error-24px.svg";
import React from "react";

function AddInventory() {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [category, setCategory] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [quantity, setQuantity] = useState("");
  const [store, setStore] = useState("");
  const [errors, setErrors] = useState({});

  const hasError = (field) => errors[field] !== undefined;

  function handleBackButton() {
    window.location.replace('/inventory');
  }

  const isFormValid = () => {
    const newErrors = {};
    if (!itemName) newErrors.itemName = "This field is required";
    if (!itemDescription) newErrors.itemDescription = "This field is required";
    if (!category) newErrors.category = "This field is required";
    if (!itemStatus) newErrors.itemStatus = "This field is required";
    if (itemStatus === "In Stock" && isNaN(quantity)) {
      newErrors.quantity = "This field is required";
    }
    if (!store) newErrors.store = "This field is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const inventoryData = {
        warehouse_name: store,
        item_name: itemName,
        description: itemDescription,
        category: category,
        status: itemStatus,
        quantity: itemStatus === "In Stock" ? quantity : 0,
      };
      console.log("Sending inventory data:", inventoryData);
      axios
        .post(`http://localhost:5050/api/inventories/`, inventoryData)
        .then((response) => {
          alert("Updated new warehouse details successfully!");
          setItemName("");
          setItemDescription("");
          setCategory("");
          setItemStatus("");
          setQuantity("");
          setStore("");
          console.log(response.data);
          window.location.replace("/inventory");
        })
        .catch((err) => {
          console.log(err);
          alert("Failed to update the new inventory, there was an error.");
        });
    } else {
      alert("Failed to update the new inventory, there was at least one error in the form.");
    }
  };

  const handleCancel = () => {
    setItemName("");
    setItemDescription("");
    setCategory("");
    setItemStatus("");
    setQuantity("");
    setStore("");
    window.location.replace("/inventory");
  };

  return (
    <main className="add-item">
      <section className="add-inventory">
        <div className="add-inventory__h1-container">
          <img
            className="add-inventory__back-button"
            src={arrow}
            alt="back arrow"
            onClick={handleBackButton}
          ></img>
          <h1 className="add-inventory__h1">Add New Inventory Item</h1>
        </div>
        <div className="divider"></div>
        <main className="add-inventory-main">
          <section className="item">
            <h2 className="item__h2">Item Details</h2>
            <form noValidate onSubmit={handleSubmit}>
              <div className="item__input-container">
                <label htmlFor="name">Item Name</label>
                <input
                  name="itemName"
                  type="text"
                  id="name"
                  // placeholder="Item Name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className={`add-item__input ${
                    hasError("itemName") ? "add-item__input--error" : ""
                  }`}
                ></input>
                {hasError("itemName") && (
                  <span className="add-item__error-message">
                    <img src={error} alt="Error icon" className="error-icon" />
                    <span className="error-text">{errors["itemName"]}</span>
                  </span>
                )}
              </div>
              <div className="item__input-container">
                <label htmlFor="description">Description</label>
                <textarea
                  name="itemDescription"
                  type="text"
                  id="description"
                  // placeholder="Please enter a brief item Description..."
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  className={`add-item__input ${
                    hasError("itemDescription") ? "add-item__input--error" : ""
                  }`}
                ></textarea>
                {hasError("itemDescription") && (
                  <span className="add-item__error-message">
                    <img src={error} alt="Error icon" className="error-icon" />
                    <span className="error-text">
                      {errors["itemDescription"]}
                    </span>
                  </span>
                )}
              </div>
              <div className="item__input-container">
                <label htmlFor="select">Category</label>
                <select
                  name="category"
                  id="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`add-item__input ${
                    hasError("category") ? "add-item__input--error" : ""
                  }`}
                >
                  <option value="">Please select</option>
                  <option value="electronics">Electronics</option>
                  <option value="gear">Gear</option>
                  <option value="apparel">Apparel</option>
                  <option value="accessories">Accessories</option>
                  <option value="health">Health</option>
                </select>
                {hasError("category") && (
                  <span className="add-item__error-message">
                    <img src={error} alt="Error icon" className="error-icon" />
                    <span className="error-text">{errors["category"]}</span>
                  </span>
                )}
              </div>
            </form>
          </section>
          <div className="divider" id="vertical"></div>
          <section className="item">
            <h2 className="item__h2">Item Availability</h2>
            <form>
              <label>Status</label>
              <div className="radio-container">
                <div className="radio-item">
                  <input
                    name="itemStatus"
                    type="radio"
                    value="In Stock"
                    checked={itemStatus === "In Stock"}
                    onChange={(e) => setItemStatus(e.target.value)}
                    className={`add-itemStatus__input ${
                      hasError("itemStatus") ? "add-item__input--error" : ""
                    }`}
                  ></input>
                  <label className="in-stock">In stock</label>
                </div>
                <div className="radio-item">
                  <input
                    name="itemStatus"
                    type="radio"
                    value="Out of Stock"
                    checked={itemStatus === "Out of Stock"}
                    onChange={(e) => setItemStatus(e.target.value)}
                    className={`add-itemStatus__input ${
                      hasError("category") ? "add-item__input--error" : ""
                    }`}
                  ></input>
                  <label className="in-stock">Out of stock</label>
                </div>
              </div>
              {hasError("itemStatus") && (
                <span className="radio-div">
                  <img src={error} alt="Error icon" className="error-icon" />
                  <span className="error-text">{errors["itemStatus"]}</span>
                </span>
              )}
              {itemStatus !== "Out of Stock" && (
                <div className="item__input-container">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    // placeholder="0"
                    onChange={(e) => setQuantity(e.target.value)}
                    className={`add-warehouse__input ${
                      hasError("quantity") ? "add-item__input--error" : ""
                    }`}
                  ></input>
                  {hasError("quantity") && (
                    <span className="add-item__error-message">
                      {errors["quantity"]}
                    </span>
                  )}
                </div>
              )}
              <div className="item__input-container">
                <label htmlFor="warehouse">Store</label>
                <select
                  id="store"
                  name="store"
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                  className={`add-item__input ${
                    hasError("store") ? "add-item__input--error" : ""
                  }`}
                >
                  <option value="">Please select</option>
                  <option value="manhattan">Manhattan</option>
                  <option value="washington">Washington</option>
                  <option value="Jersey">Jersey</option>
                  <option value="San Francisco">San Francisco</option>
                  <option value="Santa Monica">Santa Monica</option>
                  <option value="Seattle">Seattle</option>
                  <option value="Miami">Miami</option>
                </select>
                {hasError("store") && (
                  <span className="add-item__error-message">
                    <img src={error} alt="Error icon" className="error-icon" />
                    <span className="error-text">{errors["store"]}</span>
                  </span>
                )}
              </div>
            </form>
          </section>
        </main>
        <div className="item__input-button-container">
          <Link to="/" id="cancel-link">
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </Link>
          <button className="confirm-button" onClick={handleSubmit}>
            + Add Item
          </button>
        </div>
      </section>
      </main>
  );
}

export default AddInventory;
