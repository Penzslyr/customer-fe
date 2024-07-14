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
  TextField,
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
  const [searchQuery, setSearchQuery] = useState("");

  const categoryOrder = {
    Food: 1,
    Snack: 2,
    Beverage: 3,
    Other: 4,
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          "https://angkringan-backend-git-release-penzslyrs-projects.vercel.app/api/menus"
        );
        const sortedItems = response.data.sort(
          (a, b) =>
            categoryOrder[a.menu_category] - categoryOrder[b.menu_category]
        );
        setMenuItems(sortedItems);
        setFilteredMenuItems(sortedItems);
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
    filterMenuItems(searchQuery, category);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterMenuItems(query, category);
  };

  const filterMenuItems = (query, category) => {
    let filteredItems = menuItems;

    if (category !== "All") {
      filteredItems = filteredItems.filter(
        (item) => item.menu_category === category
      );
    }

    if (query) {
      filteredItems = filteredItems.filter((item) =>
        item.menu_name.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredMenuItems(filteredItems);
  };

  const defaultImage = "https://via.placeholder.com/150";

  return (
    <Container maxWidth="xl">
      <div style={{ marginBottom: "20px" }}></div>
      <Carousel
        autoPlay
        interval={3000}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        dynamicHeight={false}
        emulateTouch={true}
        style={{ width: "100%", maxHeight: "500px" }}
      >
        <div>
          <img
            src="https://www.dompetdhuafa.org/wp-content/uploads/2021/11/PHOTO-2021-11-29-11-15-48_1.jpg"
            alt="Slide 1"
            width={1920}
            height={600}
          />
        </div>
        <div>
          <img
            src="https://images.tokopedia.net/img/mNFjrc/2022/9/5/02b9f407-6d47-4c9e-a451-3be698cfb448.jpg"
            alt="Slide 2"
            width={1920}
            height={600}
          />
        </div>
        <div>
          <img
            src="https://awsimages.detik.net.id/community/media/visual/2023/12/14/menu-angkringan_169.jpeg?w=1200"
            alt="Slide 3"
            width={1920}
            height={600}
          />
        </div>
      </Carousel>

      <Typography variant="h4" gutterBottom sx={{ marginTop: 3 }}>
        Available Menus
      </Typography>

      <TextField
        label="Search Menu"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        style={{ marginBottom: 20, marginTop: 20 }}
      >
        <Button
          onClick={() => handleCategoryChange("All")}
          sx={{
            backgroundColor: category === "All" ? "primary.main" : "default",
            color: category === "All" ? "white" : "black",
          }}
        >
          All
        </Button>
        <Button
          onClick={() => handleCategoryChange("Food")}
          sx={{
            backgroundColor: category === "Food" ? "primary.main" : "default",
            color: category === "Food" ? "white" : "black",
          }}
        >
          Food
        </Button>
        <Button
          onClick={() => handleCategoryChange("Beverage")}
          sx={{
            backgroundColor:
              category === "Beverage" ? "primary.main" : "default",
            color: category === "Beverage" ? "white" : "black",
          }}
        >
          Beverage
        </Button>
        <Button
          onClick={() => handleCategoryChange("Snack")}
          sx={{
            backgroundColor: category === "Snack" ? "primary.main" : "default",
            color: category === "Snack" ? "white" : "black",
          }}
        >
          Snack
        </Button>
        <Button
          onClick={() => handleCategoryChange("Other")}
          sx={{
            backgroundColor: category === "Other" ? "primary.main" : "default",
            color: category === "Other" ? "white" : "black",
          }}
        >
          Other
        </Button>
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
                padding: 7,
                height: "100%",
                marginTop: 16,
              }}
              variant="outlined"
              square={false}
            >
              <img
                src={item.menu_img ? `${item.menu_img.filepath}` : defaultImage}
                alt={item.menu_name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <Typography variant="h6" style={{ marginTop: "10px" }}>
                {item.menu_name}
              </Typography>
              <Typography>Category: {item.menu_category}</Typography>
              <Typography>Price: Rp. {item.menu_price}</Typography>
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
