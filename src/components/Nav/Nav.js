
import "./Nav.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

function Nav() {
  const [storePage, setStorePage] = useState(true);
  function handleClick() {
    setStorePage(!storePage);
    setInventoryPage(!inventoryPage);
  }

  const [inventoryPage, setInventoryPage] = useState(false);
  function Click() {
    setInventoryPage(!inventoryPage);
    setStorePage(!storePage);
  }

  return (
    <>
      <nav className="nav">

        <div className="nav__img-container">
        <Link
            to="/"
          > <h1 className="nav__logo">INSTORE</h1>
           
          </Link>
        </div>

        <div className="nav__link-container">
          <Link
            onClick={handleClick}
            to="/"
            className={`nav__link ${storePage ? `nav--selected` : null} `}
            // If storePage is true, it adds the class nav--selected to the link, otherwise, it doesn't add any additional classes. nav__link
          >
            <p>Stores</p>
          </Link>

          <Link
            onClick={Click}
            to="/inventory"
            className={`nav__link ${
              inventoryPage ? `nav--selected` : null
            } nav__link--padding`}
          >
          {/* className for the element will include nav__link, nav--selected (if inventoryPage is true), and nav__link--padding. The nav--selected class will be added only if inventoryPage is true, indicating that the current page is related to inventory. Otherwise, only nav__link and nav__link--padding will be applied. */}
            <p>Inventory</p>
          </Link>
        </div>
        
      </nav>
    </>
  );
}

export default Nav;