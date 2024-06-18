// src/pages/EditProfile.js
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const EditProfile = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.fullname);
  const [email, setEmail] = useState(user?.email);
  const [date, setDate] = useState(user?.date);
  const [value, setValue] = useState(dayjs(user?.date));
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  // const handleSave = () => {
  //   const updatedUser = {
  //     ...user,
  //     name,
  //     email,
  //     profilePicture: profilePictureFile ? URL.createObjectURL(profilePictureFile) : profilePicture,
  //   };
  //   updateUser(updatedUser);
  // };

  // const handleProfilePictureChange = (event) => {
  //   const file = event.target.files[0];
  //   setProfilePictureFile(file);
  //   setProfilePicture(URL.createObjectURL(file));
  // };

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
          alt="Profile Picture"
          src={profilePicture}
          style={{ width: "150px", height: "150px", margin: "auto" }}
        />
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="profile-picture-upload"
          type="file"
          // onChange={handleProfilePictureChange}
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
        <TextField
          label="Date"
          fullWidth
          margin="normal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label="Controlled picker"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                console.log(dayjs(value).format());
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button
          variant="contained"
          color="primary"
          // onClick={handleSave}
          style={{ marginTop: "16px" }}
        >
          Save Changes
        </Button>
      </Paper>
    </Container>
  );
};

export default EditProfile;
