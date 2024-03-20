
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home.js";
import Nav from "./components/Nav/Nav.js";

function App() {
  return (
    <>
     <BrowserRouter>
     <Nav />
     <Routes>
      <Route>
        <Route path="/" element={<Home />} />
      </Route>
     </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
