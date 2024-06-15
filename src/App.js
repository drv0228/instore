import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.js";
import Nav from "./components/Nav/Nav.js";
import Footer from "./components/Footer/Footer.js";
import AddNewStore from "./components/AddNewStore/AddNewStore.js";
import StoreDetails from "./components/StoreDetails/StoreDetails.js";
import DeleteStore from "./components/DeleteStore/DeleteStore.js";
import EditStore from "./components/EditStore/EditStore.js";
import InventoryList from "./components/InventoryList/InventoryList.js";
import Deleteinventory from "./components/DeleteInventory/DeleteInventory.js";
import ItemDetails from "./components/ItemDetails/ItemDetails.js";
import AddInventory from "./components/AddInventory/AddInventory.js";
import EditItem from "./components/EditItem/EditItem.js";


function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/storedetails/:id" element={<StoreDetails />} />
            <Route path="/addstore" element={<AddNewStore />} />
            <Route path="/deletestore/:id" element={<DeleteStore />} />
            <Route path="/editstore/:idFromParams" element={<EditStore />} />
            <Route path="/inventory" element={<InventoryList />} />
            <Route path="/deleteinventory/:id" element={<Deleteinventory />} />
            <Route path="/itemdetails/:id" element={<ItemDetails />} />
            <Route path="/addinventory" element={<AddInventory />} />
            <Route path="/edititem/:id" element={<EditItem />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
