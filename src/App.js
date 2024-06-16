// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<div>Edit Profile Page</div>} />
          <Route path="/logout" element={<div>Logout Page</div>} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
