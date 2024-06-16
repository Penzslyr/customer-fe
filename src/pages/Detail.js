// src/pages/Detail.js
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Grid, Paper, Typography, Button, IconButton, TextField } from "@mui/material";
import { useCart } from "../context/CartContext";
import { Star, StarBorder } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Detail = () => {
  const { state } = useLocation();
  const { menuItem } = state;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const reviews = [
    { accountName: "John Doe", reviewDesc: "Great food!", reviewRate: 5, profilePic: "https://via.placeholder.com/50" },
    { accountName: "Jane Smith", reviewDesc: "Good taste but a bit pricey.", reviewRate: 4, profilePic: "https://via.placeholder.com/50" },
    { accountName: "Alice Johnson", reviewDesc: "Average experience.", reviewRate: 3, profilePic: "https://via.placeholder.com/50" },
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(menuItem);
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? <Star key={i} color="primary" /> : <StarBorder key={i} color="primary" />);
    }
    return stars;
  };

  return (
    <Container>
      <h1>Detail Page</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <img
            src={menuItem.image}
            alt={menuItem.name}
            style={{ width: "100%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <Typography variant="h4">{menuItem.name}</Typography>
            <Typography variant="body1">{menuItem.description}</Typography>
            <Typography variant="h6">Price: ${menuItem.price}</Typography>
            <Grid container alignItems="center" spacing={2} style={{ marginTop: '1rem' }}>
              <Grid item>
                <IconButton onClick={() => handleQuantityChange(-1)}>
                  <RemoveIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <TextField
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  type="number"
                  inputProps={{ min: 1, style: { textAlign: 'center' } }}
                />
              </Grid>
              <Grid item>
                <IconButton onClick={() => handleQuantityChange(1)}>
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddToCart}
              style={{ marginTop: '1rem' }}
            >
              Add to Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h5" style={{ marginTop: "2rem" }}>
        Reviews
      </Typography>
      {reviews.map((review, index) => (
        <Paper key={index} elevation={1} style={{ padding: 16, marginTop: "1rem" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <img src={review.profilePic} alt={review.accountName} style={{ borderRadius: '50%', width: '50px', height: '50px' }} />
            </Grid>
            <Grid item xs>
              <Typography variant="h6">{review.accountName}</Typography>
              <Typography variant="body2">{review.reviewDesc}</Typography>
              <Grid container alignItems="center">
                {renderStars(review.reviewRate)}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Container>
  );
};

export default Detail;
