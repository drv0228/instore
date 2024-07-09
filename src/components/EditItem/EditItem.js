import React from "react";
import "./EditItem.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import arrowBack from "../../assets/images/arrow_back-24px.svg";
import axios from "axios";
import errorImage from "../../assets/images/error-24px.svg";

function EditItem() {
  const { id } = useParams();

  const [item_name, setItem_name] = useState(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [item_status, setItem_status] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [store_id, setStore_id] = useState("");
  const [store_name, setStore_name] = useState("");

  const [storeArray, setStoreArray] = useState([]);

  const [errors, setErrors] = useState({});

  // const url = "http://localhost:5050/api/inventories/" + id;
  const url = "http://instore-server.up.railway.app/api/inventories/" + id;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setItem_name(response.data.item_name);
        setDescription(response.data.description);
        setCategory(response.data.category);
        setItem_status(response.data.status);
        setQuantity(response.data.quantity);
        setStore_name(response.data.warehouse_name);
      })
      .catch((error) => {
        console.log("error calling axios", error);
      });
  }, [url]);

  useEffect(() => {
    axios
      .get("http://instore-server.up.railway.app/api/warehouses")
      .then((response) => {
        setStoreArray(response.data);
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].warehouse_name === store_name) {
            setStore_id(response.data[i].id);
          }
        }
      })
      .catch((error) => {
        console.log("error calling axios", error);
      });
  }, [store_name]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      const itemData = {
        warehouse_id: store_id,
        item_name: item_name,
        description: description,
        category: category,
        status: item_status,
        quantity: quantity,
      };

      console.log(itemData);

      axios
        .put(`http://instore-server.up.railway.app/api/inventories/` + id, itemData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      alert("Updated item details successfully!");
      window.location.replace("/inventory");
    } else {
      alert(
        "Failed to update the item details, there was at least one error in the form."
      );
    }
  };

  const hasError = (field) => {
    return errors[field] !== undefined;
  };

  function handleBackButton() {
    window.location.replace("/inventory");
  }

  function handleCancel() {
    window.location.replace("/inventory");
  }

  const isFormValid = () => {
    const newErrors = {};

    if (!item_name) newErrors.item_name = "This field is required";
    if (!description) newErrors.description = "This field is required";
    if (!category) newErrors.category = "This field is required";
    if (!item_status) newErrors.item_status = "This field is required";
    if (!store_id) newErrors.store_id = "This field is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  if (storeArray.length !== 0 && store_id !== "") {
    return (
      <main className="edit-item">
        <section className="edit-item__page">
          <div className="edit-item__header">
            <img
              className="edit-item__img"
              src={arrowBack}
              alt="Arrow back"
              onClick={handleBackButton}
            />
            <h1 className="edit-item__title">Edit Inventory Item</h1>
          </div>

          <form noValidate onSubmit={handleSubmit} className="edit-item__form">
            <div className="edit-item__details">
              <h2 className="edit-item__subheading">Item Details</h2>
              <label htmlFor="name" className="edit-item__label">
                Item Name
                <input
                  type="text"
                  name="item_name"
                  id="name"
                  placeholder={"Item Name"}
                  value={item_name}
                  onChange={(e) => setItem_name(e.target.value)}
                  className={`edit-item__input ${
                    hasError("item_name") ? "edit-item__input--error" : ""
                  }`}
                />
                {hasError("item_name") ? (
                  <span className="edit-item__error-message">
                    {`This field is required`}
                  </span>
                ) : (
                  <span></span>
                )}
              </label>

              <label htmlFor="description">Description</label>
              <textarea
                name="itemDescription"
                type="text"
                id="description"
                placeholder="Please enter a brief item Description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`edit-item__textarea ${
                  hasError("itemDescription") ? "edit-item__input--error" : ""
                }`}
              ></textarea>
              {hasError("itemDescription") && (
                <span className="edit-item__error-message">
                  <img
                    src={errorImage}
                    alt="Error icon"
                    className="error-icon"
                  />
                  <span className="error-text">
                    {errors["itemDescription"]}
                  </span>
                </span>
              )}
              <label htmlFor="select">Category</label>
              <select
                name="category"
                id="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`edit-item__input ${
                  hasError("category") ? "edit-item__input--error" : ""
                }`}
              >
                <option value="">Please select</option>
                <option value="Electronics">Electronics</option>
                <option value="Gear">Gear</option>
                <option value="Apparel">Apparel</option>
                <option value="Accessories">Accessories</option>
                <option value="Health">Health</option>
              </select>
              {hasError("category") && (
                <span className="edit-item__error-message">
                  <img
                    src={errorImage}
                    alt="Error icon"
                    className="error-icon"
                  />
                  <span className="error-text">{errors["category"]}</span>
                </span>
              )}
            </div>
            <div className="edit-item__details edit-item__details--border ">
              <h2 className="edit-item__subheading">Item Availability</h2>
              <label>Status</label>
              <div className="radio-container">
                <div className="radio-item">
                  <input
                    name="item_status"
                    type="radio"
                    value="In Stock"
                    checked={item_status === "In Stock"}
                    onChange={(e) => setItem_status(e.target.value)}
                    className={`add-item_status__input ${
                      hasError("item_status") ? "edit-item__input--error" : ""
                    }`}
                  ></input>

                  <label>In stock</label>
                </div>
                <div className="radio-item">
                  <input
                    name="item_status"
                    type="radio"
                    value="Out of Stock"
                    checked={item_status === "Out of Stock"}
                    onChange={(e) => {
                      setItem_status(e.target.value);
                      setQuantity("0");
                    }}
                    className={`add-item_status__input ${
                      hasError("category") ? "edit-item__input--error" : ""
                    }`}
                  ></input>

                  <label>Out of stock</label>
                </div>
              </div>
              {hasError("item_status") && (
                <span className="radio-div">
                  <img
                    src={errorImage}
                    alt="Error icon"
                    className="error-icon"
                  />
                  <span className="error-text">{errors["item_status"]}</span>
                </span>
              )}

              {item_status !== "Out of Stock" && (
                <div className="item__input-container">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    placeholder="0"
                    onChange={(e) => setQuantity(e.target.value)}
                    className={`add-warehouse__input ${
                      hasError("quantity") ? "edit-item__input--error" : ""
                    }`}
                  ></input>
                  {hasError("quantity") && (
                    <span className="edit-item__error-message">
                      {errors["quantity"]}
                    </span>
                  )}
                </div>
              )}

              <label htmlFor="store">Store:</label>
              <select
                id="store"
                name="store"
                value={store_id}
                onChange={(e) => setStore_id(e.target.value)}
                className={`edit-item__input ${
                  hasError("store") ? "edit-item__input--error" : ""
                }`}
              >
                <option value="">Please select</option>
                {storeArray.map((store) => {
                  return (
                    <option key={store.id} value={store.id} selected={store.id === store_id}>
                      {store.warehouse_name}
                    </option>
                  );
                })}
              </select>       
              {hasError("store") && (
                <span className="edit-item__error-message">
                  <img
                    src={errorImage}
                    alt="Error icon"
                    className="error-icon"
                  />
                  <span className="error-text">{errors["store"]}</span>
                </span>
              )}
            </div>
          </form>

          <div className="edit-item__buttons">
            <button className="edit-item__button-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button className="edit-item__button-save" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </section>
      </main>
    );
  } else {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }
}
export default EditItem;
