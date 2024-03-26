import "./StoreList.scss";

import Search from "../../assets/images/search-24px.svg";
import { Link } from "react-router-dom";

function StoreList() {
    return (
      <div className="stores">
        <div className="stores-content">
            <div className="stores-content__nav">
                <h1 className="stores-content__nav--title">Stores</h1>
                <div className="stores-content__nav--search">
                    <input type="search" value="Search..."
                    className="stores-content__nav--search-field"
                    readOnly
                    />{" "}
                    <img src={Search} alt="search" />
                </div>
                <Link
                className="stores-content__links"
                to={`/addstore`}
                >
                    <button className="stores-content__nav--button"> {" "} +Add New Store{"" }
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

        </div>
      </div>
    );
}

export default StoreList;