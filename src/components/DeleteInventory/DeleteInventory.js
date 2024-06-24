import "./DeleteInventory.scss";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import close from "../../assets/images/close-24px.svg";


function Deleteinventory() {
  const { id } = useParams();
  const [inventoryName, setInventoryName] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5050/api/inventories/` + id)
      .then((response) => {
        setInventoryName(response.data.item_name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleDeleteClick() {
    const url = "http://localhost:5050/api/inventories/" + id;
    axios
      .delete(url)
      .then((response) => {
        alert("Inventory deleted succesfully");
        window.location.replace("/inventory");
      })
      .catch((error) => {
        console.log(error);
        alert("Inventories deletion failed", error);
      });
  }

  function handleCancelClick() {
    window.location.replace("/inventory");
  }

  return (
    <main className="instock__main">
      <div className="instock">
        <div className="instock__container">
          <div className="instock__icon-container" onClick={handleCancelClick}>
            <img className="instock__icon" src={close} alt="close-icon" />
          </div>
          <h1 className="instock__heading">
            Delete {inventoryName} inventory item?
          </h1>
          <p className="instock__paragraph">
            Please confirm that you'd like to delete {inventoryName} from the
            inventory list.  </p>
            You won't be able to undo this action.
         
        </div>
        <div className="instock__button-container">
          <button className="instock__button instock__button--1" onClick={handleCancelClick}>Cancel</button>
          <button className="instock__button instock__button--2" onClick={handleDeleteClick}>Delete</button>
        </div>
      </div>
    </main>
  );
}

export default Deleteinventory;