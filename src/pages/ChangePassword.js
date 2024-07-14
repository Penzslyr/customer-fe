import React, { useState } from "react";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ChangePassword = () => {
  const { user } = useAuth();
  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSave = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "https://angkringan-backend-git-release-penzslyrs-projects.vercel.app/users/reset-password",
        new URLSearchParams({
          email: user.email,
          prevPassword,
          newPassword,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(response.data);
      alert("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password.");
    }
  };

  return (
    <Container sx={{ minHeight: "725px", marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>

      <Paper elevation={3} style={{ padding: 16 }}>
        <Typography variant="h6" gutterBottom>
          Change Password
        </Typography>
        <TextField
          label="Previous Password"
          type="password"
          fullWidth
          margin="normal"
          value={prevPassword}
          onChange={(e) => setPrevPassword(e.target.value)}
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          label="Confirm New Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{ marginTop: "16px" }}
        >
          Save Changes
        </Button>
      </Paper>
    </Container>
  );
};

export default ChangePassword;
