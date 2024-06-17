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
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import TransactionHistory from "./pages/TransactionHistory";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <TransactionHistory />
                </ProtectedRoute>
              }
            />

            <Route path="/logout" element={<div>Logout Page</div>} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
