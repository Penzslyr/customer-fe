import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { Star, StarBorder } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { state } = useLocation();
  const { menuItem } = state;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewRate, setReviewRate] = useState(1);
  const [reviewDesc, setReviewDesc] = useState("");
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const reviews = [
    {
      accountName: "John Doe",
      reviewDesc: "Great food!",
      reviewRate: 5,
      profilePic: "https://via.placeholder.com/50",
    },
    {
      accountName: "Jane Smith",
      reviewDesc: "Good taste but a bit pricey.",
      reviewRate: 4,
      profilePic: "https://via.placeholder.com/50",
    },
    {
      accountName: "Alice Johnson",
      reviewDesc: "Average experience.",
      reviewRate: 3,
      profilePic: "https://via.placeholder.com/50",
    },
  ];

  const handleAddToCart = () => {
    if (isLoggedIn) {
      for (let i = 0; i < quantity; i++) {
        addToCart(menuItem);
      }
    } else {
      setDialogOpen(true);
    }
  };

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < rating ? (
          <Star key={i} color="primary" />
        ) : (
          <StarBorder key={i} color="primary" />
        )
      );
    }
    return stars;
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleReviewSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/reviews", {
        accountName: user.name, // assuming you have user info in the auth context
        reviewRate,
        reviewDesc,
        profilePic: user.profilePic, // assuming you have user profile pic in the auth context
      });
      console.log(response.data);
      alert("Review submitted successfully!");
      setReviewDialogOpen(false);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  };

  return (
    <Container>
      <h1>Detail Page</h1>
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
      <Dialog
        open={reviewDialogOpen}
        onClose={() => setReviewDialogOpen(false)}
      >
        <DialogTitle>Add Review</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Rating"
            value={reviewRate}
            onChange={(e) => setReviewRate(e.target.value)}
            fullWidth
            margin="normal"
          >
            {[1, 2, 3, 4, 5].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Review Description"
            value={reviewDesc}
            onChange={(e) => setReviewDesc(e.target.value)}
            fullWidth
            margin="normal"
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleReviewSubmit}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
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
            <Grid
              container
              alignItems="center"
              spacing={2}
              style={{ marginTop: "1rem" }}
            >
              <Grid item>
                <IconButton onClick={() => handleQuantityChange(-1)}>
                  <RemoveIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <TextField
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))
                  }
                  type="number"
                  inputProps={{ min: 1, style: { textAlign: "center" } }}
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
              style={{ marginTop: "1rem" }}
            >
              Add to Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ marginTop: "2rem" }}
      >
        <Typography variant="h5">Reviews</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setReviewDialogOpen(true)}
        >
          Add Review
        </Button>
      </Grid>

      {reviews.map((review, index) => (
        <Paper
          key={index}
          elevation={1}
          style={{ padding: 16, marginTop: "1rem" }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <img
                src={review.profilePic}
                alt={review.accountName}
                style={{ borderRadius: "50%", width: "50px", height: "50px" }}
              />
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
