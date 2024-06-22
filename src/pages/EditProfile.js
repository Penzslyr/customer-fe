import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

const EditProfile = () => {
  const baseURL = "http://localhost:4000/";
  const url = "http://localhost:4000/api/users";
  const { user } = useAuth();
  const [name, setName] = useState(user?.fullname);
  const [email, setEmail] = useState(user?.email);
  const [value, setValue] = useState(dayjs(user?.date));
  const [profilePicture, setProfilePicture] = useState(
    `${baseURL}${user?.profileImage?.filepath}`
  );
  const [profileImage, setProfileImage] = useState(null);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("fullname", name);
      formData.append("email", email);
      formData.append("date", dayjs(value).format());
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await axios.put(`${url}/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setProfilePicture(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Container sx={{ minHeight: "725px", marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>

      <Paper
        elevation={3}
        style={{ padding: 16, textAlign: "center", marginBottom: "15px" }}
      >
        <Avatar
          src={profilePicture}
          alt={user?.profileImage?.filename}
          style={{ width: "150px", height: "150px", margin: "auto" }}
        />
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="profile-picture-upload"
          type="file"
          onChange={handleProfilePictureChange}
        />
        <label htmlFor="profile-picture-upload">
          <Button
            variant="contained"
            component="span"
            style={{ marginTop: "16px" }}
          >
            Change Picture
          </Button>
        </label>
      </Paper>
      <Paper elevation={3} style={{ padding: 16 }}>
        <TextField
          label="Full name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label="Date"
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
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

export default EditProfile;
