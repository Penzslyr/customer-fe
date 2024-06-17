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

const EditProfile = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.fullname);
  const [email, setEmail] = useState(user?.email);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  console.log(user);
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
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper elevation={3} style={{ padding: 16, textAlign: "center" }}>
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
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <TextField
              label="Name"
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
            <Button
              variant="contained"
              color="primary"
              // onClick={handleSave}
              style={{ marginTop: "16px" }}
            >
              Save Changes
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditProfile;
