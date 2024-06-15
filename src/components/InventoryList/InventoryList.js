import "./InventoryList.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "../../assets/images/search-24px.svg";
import Delete from "../../assets/images/delete_outline-24px.svg";
import Edit from "../../assets/images/edit-24px.svg";
import Arrow from "../../assets/images/chevron_right-24px.svg";
import Sort from "../../assets/images/sort-24px.svg";
import { Link } from "react-router-dom";

function InventoryList() {
  const inventoriesUrl = `http://localhost:5050/api/inventories`;

  const [inventoriesItems, setInventoriesItems] = useState([]);
  const [selectedInventoriesItem, setSelectedInventoriesItem] = useState(null);

  useEffect(() => {
    getAndDisplayInventories();
  }, );

  const getAndDisplayInventories = () => {
    axios
      .get(`${inventoriesUrl}`)
      .then((result) => {
        setInventoriesItems(result.data);
      })
      .catch((error) => {
        console.log("got error calling API", error);
      });
  };

  const handleInventoriesClick = (index) => {
    setSelectedInventoriesItem(index);
  };

  return (
    <div className="inventories">
      <div className="inventories-content">

        <div className="inventories-content__nav">
          <h1 className="inventories-content__nav--title">Inventory</h1>
          
          <div className="inventories-content__nav--search">
            <input
              type="search"
              value="Search..."
              className="inventories-content__nav--search-field"
              readOnly
            />{" "}
            <img src={Search} alt="search" />
          </div>

          <Link className="inventories__links" to={`/addinventory`}>
          <button className="inventories-content__nav--button">
            {" "}
            + Add New Item{" "}
          </button>
          </Link>
        </div>

        <div className="inventories-content__titles">
          <p className="inventories-content__titles--inventory-item">
            INVENTORY ITEM <img src={Sort} alt="sort arrows" />{" "}
          </p>
          <p className="inventories-content__titles--category">
            CATEGORY <img src={Sort} alt="sort arrows" />{" "}
          </p>
          <p className="inventories-content__titles--status">
            STATUS <img src={Sort} alt="sort arrows" />{" "}
          </p>
          <p className="inventories-content__titles--quantity">
            QTY <img src={Sort} alt="sort arrows" />{" "}
          </p>
          <p className="inventories-content__titles--store">
            STORE <img src={Sort} alt="sort arrows" />{" "}
          </p>
          <p className="inventories-content__titles--actions">ACTIONS</p>
        </div>

        <div className="inventories-content__list">

          {inventoriesItems.map((item, index) => (
            <div
              key={index}
              className={`inventories-content__list-inventory ${
                selectedInventoriesItem === index
                  ? "inventories-content__list-inventory--selected"
                  : ""
              }`}
              onClick={() => handleInventoriesClick(index)}
            >

              <div className="inventories-content__list-inventory--rows">
                <div className="inventories-content__list-inventory--columns">
                  <div className="inventories-content__list-inventory--title">
                    <p>INVENTORY ITEM</p>
                  </div>

                  <Link
                    className="inventories__links"
                    to={`/itemdetails/${item.id}`}
                  >
                    <div className="inventories-content__list-inventory--item-name">
                      <p className="inventories-content__list-inventory--item-name-layout">
                        {item.item_name}
                        <img src={Arrow} alt="arrow" />
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="inventories-content__list-inventory--columns-2">
                  <div className="inventories-content__list-inventory--title">
                    <p>STATUS</p>
                  </div>

                  <div
                    className={`inventories-content__list-inventory--status ${
                      item.status === "In Stock" ? "in-stock" : "out-of-stock"
                    }`}
                  >
                    <p>{item.status}</p>
                  </div>
                  <div className="inventories-content__list-inventory--category-tablet">
                    <p>{item.category}</p>
                  </div>

                </div>
              </div>

              <div className="inventories-content__list-inventory--rows">
                <div className="inventories-content__list-inventory--columns">

                  <div className="inventories-content__list-inventory--title">
                    <p>CATEGORY</p>
                  </div>

                  <div className="inventories-content__list-inventory--category">
                    <p>{item.category}</p>
                  </div>

                

                </div>

                <div
                    className={`inventories-content__list-inventory--status-tablet ${
                      item.status === "In Stock" ? "in-stock" : "out-of-stock"
                    }`}
                  >
                    <p>{item.status}</p>
                  </div>

                <div className="inventories-content__list-inventory--columns-tablet">

                  <div className="inventories-content__list-inventory--title">
                    <p>QTY</p>
                  </div>

                  <div className="inventories-content__list-inventory--quantity">
                    <p>{item.quantity}</p>
                  </div>

                  <div className="inventories-content__list-inventory--title">
                    <p>STORE</p>
                  </div>

                  <div className="inventories-content__list-inventory--warehouse">
                    <p>{item.warehouse_name}</p>
                  </div>

                </div>

              </div>

              <div className="inventories-content__list-inventory--actions">
                <Link to={`/deleteinventory/${item.id}`}>
                  {" "}
                  <img src={Delete} alt="delete icon" />
                </Link>

                <Link to={`/edititem/${item.id}`}>
                  {" "}
                  <img src={Edit} alt="edit" />
                </Link>  
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InventoryList;
