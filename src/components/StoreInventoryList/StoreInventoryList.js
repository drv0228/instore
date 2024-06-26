import "./StoreInventoryList.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Delete from "../../assets/images/delete_outline-24px.svg";
import Edit from "../../assets/images/edit-24px.svg";
import Arrow from "../../assets/images/chevron_right-24px.svg";
import Sort from "../../assets/images/sort-24px.svg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function StoreInventoryList() {
  const { id } = useParams();

  const [storeInventoriesItems, setstoreInventoriesItems] = useState([]);
  // const [error, setError] = useState(null);

  let defaultStoreId = null;

  if (storeInventoriesItems.length > 0) {
    defaultStoreId = storeInventoriesItems[0].id;
  }

  const storeIdToDisplay = id !== undefined ? id : defaultStoreId;

  // const filteredStores = storeInventoriesItems.filter((store) => {
  //   return store.id !== storeIdToDisplay;
  // });
  const storeinventoriesUrl = `http://localhost:5050/api/warehouses/${storeIdToDisplay}/inventories`;
  //  const  storeinventoriesUrl = `http:// instore-server.up.railway.app/api/warehouses/${storeIdToDisplay}/inventories`;

  const [
    selectedStoreInventoriesItem,
    setSelectedStoreInventoriesItem,
  ] = useState(null);

  useEffect(() => {
    getAndDisplayStoreInventories();
  }, [id]);

  const getAndDisplayStoreInventories = () => {
    axios
      .get(storeinventoriesUrl)
      .then((result) => {
        setstoreInventoriesItems(result.data);
        // setError(null); // Clear previous errors
      })
      .catch((error) => {
        console.log("got error calling API", error);
        // setError(error.message);
      });
  };

  const handleStoreInventoriesClick = (index) => {
    setSelectedStoreInventoriesItem(index);
  };

  return (
    <div className="store-inventories">
      <div className="store-inventories-content">
        <div className="store-inventories-content__titles">
          <p className="store-inventories-content__titles--inventory-item">
            INVENTORY ITEM <img src={Sort} alt="sort arrows" />{" "}
          </p>
          <p className="store-inventories-content__titles--category">
            CATEGORY <img src={Sort} alt="sort arrows" />{" "}
          </p>
          <p className="store-inventories-content__titles--status">
            STATUS <img src={Sort} alt="sort arrows" />{" "}
          </p>
          <p className="store-inventories-content__titles--quantity">
            QUANTITY <img src={Sort} alt="sort arrows" />{" "}
          </p>
          <p className="store-inventories-content__titles--actions">
            ACTIONS
          </p>
        </div>

        <div className="store-inventories-content__list">
          {storeInventoriesItems.map((item, index) => (
            <div
              key={index}
              className={`store-inventories-content__list-inventory ${
                selectedStoreInventoriesItem === index
                  ? "store-inventories-content__list-inventory--selected"
                  : ""
              }`}
              onClick={() => handleStoreInventoriesClick(index)}
            >
              <div className="store-inventories-content__list-inventory--rows">
                <div className="store-inventories-content__list-inventory--columns">
                  <div className="store-inventories-content__list-inventory--title">
                    <p>INVENTORY ITEM</p>
                  </div>
                  <Link
                    className="store-inventories__links"
                    to={`/itemdetails/${item.id}`}
                    key={item.id}
                  >
                    <div className="store-inventories-content__list-inventory--item-name">
                      <p className="store-inventories-content__list-inventory--item-name-layout">
                        {item.item_name}
                        <img src={Arrow} alt="arrow" />
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="store-inventories-content__list-inventory--columns-2">
                  <div className="store-inventories-content__list-inventory--title">
                    <p>STATUS</p>
                  </div>
                  <div
                    className={`store-inventories-content__list-inventory--status ${
                      item.status === "In Stock" ? "in-stock" : "out-of-stock"
                    }`}
                  >
                    <p>{item.status}</p>
                  </div>
                  <div className="store-inventories-content__list-inventory--category-tablet">
                    <p>{item.category}</p>
                  </div>
                </div>
              </div>

              <div className="store-inventories-content__list-inventory--rows">
                <div className="store-inventories-content__list-inventory--columns">
                  <div className="store-inventories-content__list-inventory--title">
                    <p>CATEGORY</p>
                  </div>
                  <div className="store-inventories-content__list-inventory--category">
                    <p>{item.category}</p>
                  </div>
                  <div
                    className={`store-inventories-content__list-inventory--status-tablet ${
                      item.status === "In Stock" ? "in-stock" : "out-of-stock"
                    }`}
                  >
                    <p>{item.status}</p>
                  </div>
                </div>
                <div className="store-inventories-content__list-inventory--columns-tablet">
                  <div className="store-inventories-content__list-inventory--title">
                    <p>QTY</p>
                  </div>
                  <div className="store-inventories-content__list-inventory--quantity">
                    <p>{item.quantity}</p>
                  </div>
                </div>
              </div>

              <div className="store-inventories-content__list-inventory--actions">
                <Link to={`/deleteinventory/${item.id}`} key={item.id}>
                  {" "}
                  <img src={Delete} alt="delete" />
                </Link>{" "}
                <Link to={`/edititem/${item.id}`} key={item.id}>
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

export default StoreInventoryList;
