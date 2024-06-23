import React, { useState, useEffect } from "react";
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
  ButtonGroup,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/menus");
        setMenuItems(response.data);
        setFilteredMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleMenuClick = (item) => {
    navigate(`/detail/${item._id}`, { state: { menuItem: item } });
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

  const handleCategoryChange = (category) => {
    setCategory(category);
    if (category === "All") {
      setFilteredMenuItems(menuItems);
    } else {
      setFilteredMenuItems(
        menuItems.filter((item) => item.menu_category === category)
      );
    }
  };

  const defaultImage = "https://via.placeholder.com/150";

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

      <Typography variant="h4" gutterBottom sx={{ marginTop: 3 }}>
        Available Menus
      </Typography>

      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        style={{ marginBottom: 20 }}
      >
        <Button onClick={() => handleCategoryChange("All")}>All</Button>
        <Button onClick={() => handleCategoryChange("Food")}>Food</Button>
        <Button onClick={() => handleCategoryChange("Drink")}>Drink</Button>
        <Button onClick={() => handleCategoryChange("Snack")}>Snack</Button>
        <Button onClick={() => handleCategoryChange("Other")}>Other</Button>
      </ButtonGroup>

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
        {filteredMenuItems.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={item._id}
            sx={{ marginBottom: 5 }}
          >
            <Paper
              elevation={3}
              style={{
                padding: 16,
                height: "100%",
                marginBottom: 16,
                marginTop: 16,
              }}
              variant="outlined"
              square={false}
            >
              <img
                src={
                  item.menu_img
                    ? `http://localhost:4000/${item.menu_img.filepath}`
                    : defaultImage
                }
                alt={item.menu_name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <Typography variant="h6" style={{ marginTop: "10px" }}>
                {item.menu_name}
              </Typography>
              <Typography>Category: {item.menu_category}</Typography>
              <Typography>Price: ${item.menu_price}</Typography>
              <Typography>{item.menu_desc}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleMenuClick(item)}
                style={{ marginTop: "10px" }}
              >
                View Details
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleAddToCart(item)}
                style={{ marginTop: "10px", marginLeft: "8px" }}
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
