// src/components/ProtectedRoute.js
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import WarningModal from "./WarningModal";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setOpen(true);
    }
  }, [isLoggedIn]);

  const handleClose = () => {
    setOpen(false);
  };

  if (!isLoggedIn) {
    return <WarningModal open={open} handleClose={handleClose} />;
  }

  return children;
};

export default ProtectedRoute;
