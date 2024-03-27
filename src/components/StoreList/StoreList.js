import "./StoreList.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../../assets/images/search-24px.svg";
import Delete from "../../assets/images/delete_outline-24px.svg";
import Edit from "../../assets/images/edit-24px.svg";
import Arrow from "../../assets/images/chevron_right-24px.svg";
import Sort from "../../assets/images/sort-24px.svg";



function StoreList() {
  const url = `http://localhost:5050/api/warehouses`;
  const storesUrl = `${url}`;

  const [contentItems, setContentItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
 
    getAndDisplayStores();
  }, []);

  const getAndDisplayStores = () => {
    axios
      .get(storesUrl)
      .then((result) => {
        setContentItems(result.data);
      })
      .catch((error) => {
        console.log("got error calling API", error);
      });
  };

  const handleStoresClick = (index) => {
    setSelectedItem(index);
  };

  return (
    <div className="stores">
      <div className="stores-content">
        <div className="stores-content__nav">
          <h1 className="stores-content__nav--title">Stores</h1>
          <div className="stores-content__nav--search">
            <input
              type="search"
              value="Search..."
              className="stores-content__nav--search-field"
              readOnly
            />{" "}
            <img src={Search} alt="search" />
          </div>
          <Link className="stores-content__links" to={`/addstore`}>
            <button className="stores-content__nav--button">
              {" "}
              +Add New Store{""}
            </button>
          </Link>
        </div>

        <div className="stores-content__titles">
          <p className="stores-content__titles--store">
            STORE <img src={Sort} alt="sort arrows" />{" "}
          </p>
          <p className="stores-content__title--address">
            ADDRESS <img src={Sort} alt="sort arrows" />{" "}
          </p>
          <p className="stores-content__titles--contact-name">
            CONTACT NAME <img src={Sort} alt="sort arrows" />{" "}
          </p>
          <p className="stores-content__titles--contact-info">
            CONTACT INFORMATION <img src={Sort} alt="sort arrows" />{" "}
          </p>
          <p className="stores-content__titles--actions">ACTIONS</p>
        </div>

        <div className="stores-content__list">
          {contentItems.map((item, index) => (
            <div
              key={index}
              className={`stores-content__list-store ${
                selectedItem === index
                  ? "stores-content__list-store--selected"
                  : ""
              }`}
              onClick={() => handleStoresClick(index)}
            >
  <div className="stores-content__list-store--rows">
                <div className="stores-content__list-store--columns">
                  <div className="stores-content__list-store--title">
                    <p>STORE</p>
                  </div>
                  {/* <Link
                    className="stores-content__links"
                    to={`/storedetails/${item.id}`}
                  > */}
                  <div className="stores-content__list-store--name">
                    <p className="stores-content__list-store--name-layout">
                      {item.warehouse_name}
                      <img src={Arrow} alt="arrow" />
                    </p>
                  </div>
                  {/* </Link> */}
                </div>
                <div className="stores-content__list-store--columns-2">
                  <div className="stores-content__list-store--title">
                    <p>CONTACT NAME</p>
                  </div>
                  <div className="stores-content__list-store--contact-name">
                    <p>{item.contact_name}</p>
                  </div>
                  <div className="stores-content__list-store--address-tablet">
                    <p>
                      {item.address}, {item.city}, {item.country}
                    </p>
                  </div>
                </div>
              </div>

              <div className="stores-content__list-store--rows">
                <div className="stores-content__list-store--columns">
                  <div className="stores-content__list-store--title">
                    <p>ADDRESS</p>
                  </div>
                  <div className="stores-content__list-store--address">
                    <p>
                      {item.address}, {item.city}, {item.country}
                    </p>
                  </div>
                  <div className="stores-content__list-store--contact-name-tablet">
                    <p>{item.contact_name}</p>
                  </div>
                </div>
                <div className="stores-content__list-store--columns">
                  <div className="stores-content__list-store--title">
                    <p>CONTACT INFORMATION</p>
                  </div>
                  <div className="stores-content__list-store--contact-info">
                    <p>
                      {item.contact_phone} {item.contact_email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="stores-content__list-store--actions">
              <Link
                    className="stores-content__links"
                    to={`/deletestore/${item.id}`}
                  ><img src={Delete} alt="delete" /></Link> 
{/* 
                 <Link
                    className="stores-content__links"
                    to={`/editstore/${item.id}`}
                  ><img src={Edit} alt="edit" /></Link>  */}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StoreList;
