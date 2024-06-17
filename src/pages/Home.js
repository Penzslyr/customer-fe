// src/pages/Home.js
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);

  const menuItems = [
    {
      id: 1,
      name: "Menu 1",
      category: "Food",
      price: 10,
      image: "https://via.placeholder.com/150",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      name: "Menu 2",
      category: "Drink",
      price: 5,
      image: "https://via.placeholder.com/150",
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      name: "Menu 3",
      category: "Snack",
      price: 3,
      image: "https://via.placeholder.com/150",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  const handleMenuClick = (item) => {
    navigate(`/detail/${item.id}`, { state: { menuItem: item } });
  };

  const handleAddToCart = (item) => {
    if (isLoggedIn) {
      addToCart(item);
    } else {
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container>
      <h1>Home Page</h1>
      <Carousel
        autoPlay
        interval={3000}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
      >
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 1" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 2" />
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400" alt="Slide 3" />
        </div>
      </Carousel>

      <Typography variant="h4" gutterBottom>
        Available Menus
      </Typography>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <Typography>
            You need to be logged in to add items to the cart.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
          <Button
            onClick={() => navigate("/login")}
            color="primary"
            variant="contained"
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container spacing={3}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Paper elevation={3} style={{ padding: 16 }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", height: "auto" }}
              />
              <Typography variant="h6">{item.name}</Typography>
              <Typography>Category: {item.category}</Typography>
              <Typography>Price: ${item.price}</Typography>
              <Typography>{item.description}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleMenuClick(item)}
              >
                View Details
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleAddToCart(item)}
                style={{ marginLeft: 8 }}
              >
                Add to Cart
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
