import React from "react";
import axios from "axios";
import "./StoreDetails.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import backLogo from "../../assets/images/arrow_back-24px.svg";
import editButton from "../../assets/images/edit-24px-white.svg";
import StoreInventoryList from "../StoreInventoryList/StoreInventoryList.js";

function StoreDetails() {
  const [details, setDetails] = useState([]);
  const { id } = useParams();
  const storeURL = "http://localhost:5050/api/warehouses/" + id;
  useEffect(() => {
    axios
      .get(storeURL)
      .then((response) => {
        setDetails(response.data);
      })
      .catch((error) => {
        console.log("axios call failed", error);
      });
  }, []);

  if (details.length === 0) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  } else {
    let inStock;
    details[0].quantity != 0 ? (inStock = true) : (inStock = false);
    return (
      <>
        <section className="store-details-wrap">
          <section id="store-details">
            <section className="store-details__h1-container">
              <div className="store-details__back-button">
               <Link className="store-details_back" to={`/`} ><img src={backLogo} alt="back button" /></Link>
                <h1 className="store-details__h1">
                  {details[0].warehouse_name}
                </h1>
              </div>
              <div className="store-details__edit-button">
                <img src={editButton} alt="button used to edit one item" />
              </div>
            </section>
            <div className="line"></div>
            <section className="store-details__details-container">
              <div
                className="store-details__address-container "
                id="container-border"
              >
                <h4 className="store-details__h4">store ADDRESS:</h4>
                <div className="store-details__p-container">
                  <p className="store-details__p2" id="smaller-width">
                    {details[0].address}
                  </p>
                  <div className="p-details-div">
                    <p className="store-details__p2"> {details[0].city}</p>
                    <p className="store-details__p2">{details[0].state}</p>
                  </div>
                </div>
              </div>
              <div className="store-details__contact-container">
                <div id="contact-name">
                  <div className="store-details__contact-details-container">
                    <h4 className="store-details__h4">CONTACT NAME:</h4>
                  </div>
                  <div>
                    <p className="store-details__p2">
                      {details[0].contact_name}
                    </p>
                    <p className="store-details__p2">
                      {details[0].contact_position}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="store-details__contact-details-container">
                    <h4 className="store-details__h4">CONTACT INFORMATION:</h4>
                  </div>
                  <div>
                    <p className="store-details__p2">
                      {details[0].contact_phone}{" "}
                    </p>
                    <p className="store-details__p2">
                      {details[0].contact_email}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </section>
          <StoreInventoryList />
        </section>
      </>
    );
  }
}

export default StoreDetails;
