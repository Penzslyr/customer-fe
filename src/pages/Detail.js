import React, { useEffect, useState } from "react";
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
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://angkringan-backend-git-release-penzslyrs-projects.vercel.app/api/reviews/getbymenu/${menuItem._id}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [menuItem._id]);

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
      const response = await axios.post(
        "https://angkringan-backend-git-release-penzslyrs-projects.vercel.app/api/reviews/create",
        {
          accountId: user._id, // assuming you have user info in the auth context
          menuId: menuItem._id,
          review_rate: reviewRate,
          review_desc: reviewDesc,
          userId: user._id,
        },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      console.log(response.data);
      alert("Review submitted successfully!");
      setReviewDialogOpen(false);
      // Re-fetch reviews to show the newly added review
      const reviewsResponse = await axios.get(
        `https://angkringan-backend-git-release-penzslyrs-projects.vercel.app/api/reviews/getbymenu/${menuItem._id}`
      );
      setReviews(reviewsResponse.data);
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
            src={menuItem?.menu_img_url}
            alt={menuItem.menu_name}
            style={{ width: "100%", height: "auto" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <Typography variant="h4">{menuItem.menu_name}</Typography>
            <Typography variant="body1">{menuItem.menu_desc}</Typography>
            <Typography variant="h6">
              Price: Rp.{menuItem.menu_price}
            </Typography>
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
                src={
                  `https://angkringan-backend-git-release-penzslyrs-projects.vercel.app/${review.accountId.profileImage.filepath}` ||
                  "https://via.placeholder.com/50"
                }
                alt={review.accountId.fullname}
                style={{ borderRadius: "50%", width: "50px", height: "50px" }}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h6">{review.accountId.fullname}</Typography>
              <Typography variant="body2">{review.review_desc}</Typography>
              <Grid container alignItems="center">
                {renderStars(review.review_rate)}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Container>
  );
};

export default Detail;
