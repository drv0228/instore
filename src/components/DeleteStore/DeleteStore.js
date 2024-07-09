import React from "react";
import "./DeleteStore.scss";
import close from "../../assets/images/close-24px.svg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


function Deletestore() {
  const { id } = useParams();
  const [storeName, setStoreName ] = useState();
   
  useEffect(() => {
    axios 
      .get(`http://instore-server.up.railway.app/api/warehouses/` + id)
      .then((response) => {
        setStoreName(response.data[0].warehouse_name);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  function handleDeleteClick() {
    const urlId = `http://instore-server.up.railway.app/api/warehouses/` + id;
    axios 
    .delete(urlId)
    .then(() => {
      alert("Store deleted succesfully");
      window.location.replace("/");
    })
    .catch((error) => {
      console.log(error);
      alert("Store deletion failed", error);
    });
  }

  function handleCancelClick() {
    window.location.replace("/");
  }
return (
    <main className="store__main">
      <div className="store">
        <div className="store__container">
          <div className="store__icon-container">
            <img
              className="store__icon"
              src={close}
              alt="close-icon"
              onClick={handleCancelClick}
            />
          </div>
          <h1 className="store__heading">
            Delete {storeName} store?
          </h1>
          <p className="store__paragraph">
            Please confirm that you would like to delete {storeName} store from the list of stores. You would not be able to undo this action.
          </p>
        </div>
        <div className="store__button-container">
          <button
            className="store__button store__button--1"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button
            className="store__button store__button--2"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>
    </main>
);
}
export default Deletestore;
