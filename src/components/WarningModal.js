// src/components/WarningModal.js
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const WarningModal = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    handleClose();
    navigate("/login");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Access Denied"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You need to be logged in to access this page. Please log in first.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLoginRedirect} color="primary" autoFocus>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WarningModal;
