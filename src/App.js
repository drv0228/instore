
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home.js";
import Nav from "./components/Nav/Nav.js";
import Footer from './components/Footer/Footer.js';
import DeleteStore from './components/DeleteStore/DeleteStore.js';
import EditStore from './components/EditStore/EditStore.js'

function App() {
  return (
    <>
     <BrowserRouter>
     <Nav />
     <Routes>
      <Route>
        <Route path="/" element={<Home />} />
        {/* <Route path="/storedetails/:id" element={<StoreDetails />} /> */}
        <Route path="/deletestore/:id" element={<DeleteStore />} />
        <Route path="/editstore/:idFromParams" element={<EditStore />} />
        {/* <Route path="/inventory" element={<InventoryList />} /> */}
      </Route>
     </Routes>
     <Footer />
     </BrowserRouter>
    </>
  );
}

export default App;
