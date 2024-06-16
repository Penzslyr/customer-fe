// src/pages/Home.js
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Container, Grid, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const menuItems = [
    {
      id: 1,
      name: "Menu 1",
      category: "Food",
      price: 10,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Menu 2",
      category: "Drink",
      price: 5,
      description:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Menu 3",
      category: "Snack",
      price: 3,
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      image: "https://via.placeholder.com/150",
    },
  ];

  const handleMenuClick = (item) => {
    navigate(`/detail/${item.id}`, { state: { menuItem: item } });
  };

  const handleAddToCart = (item) => {
    addToCart(item);
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
              <Typography>Price: {item.price}</Typography>
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
