import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [promos, setPromos] = useState([]);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch promos
    const fetchPromos = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/promos");
        setPromos(response.data);
      } catch (error) {
        console.error("Error fetching promos:", error);
      }
    };

    fetchPromos();
  }, []);

  useEffect(() => {
    // Calculate total price
    const newTotalPrice = cart.reduce(
      (acc, item) => acc + item.menu_price * item.quantity,
      0
    );
    setTotalPrice(
      selectedPromo ? newTotalPrice - selectedPromo.promo_price : newTotalPrice
    );
  }, [cart, selectedPromo]);

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity < 1) return;
    updateQuantity(itemId, quantity);
  };

  const handleCheckout = async () => {
    const transactionData = {
      account_id: user._id, // Replace with actual account ID
      promo_id: selectedPromo ? selectedPromo._id : null,
      t_status: "Waiting for payment",
      t_total: totalPrice,
      t_items: cart.map((item) => ({
        menu_id: item._id,
        menu_name: item.menu_name,
        quantity: item.quantity,
        price: item.menu_price,
      })),
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/transactions",
        transactionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert("Checkout successful! Please proceed with payment.");
      clearCart(); // Clear the cart
      navigate("/transactions"); // Redirect to transaction history
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  const handlePromoChange = (event) => {
    const selectedPromo = promos.find(
      (promo) => promo._id === event.target.value
    );
    setSelectedPromo(selectedPromo);
  };

  return (
    <Container sx={{ paddingTop: 3 }}>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {cart.map((item) => (
              <div style={{ paddingTop: 10 }} key={item._id}>
                <Paper elevation={3} style={{ padding: 16, display: "flex" }}>
                  <img
                    src={item?.menu_img_url}
                    alt={item.menu_name}
                    style={{
                      maxHeight: "200px",
                      maxWidth: "200px",
                      width: "auto",
                      height: "auto",
                      marginRight: "16px",
                    }}
                  />
                  <div style={{ flexGrow: 1 }}>
                    <Typography variant="h6">{item.menu_name}</Typography>
                    <Typography variant="body1">
                      {item.menu_category}
                    </Typography>
                    <Typography variant="body1">
                      Price: {item.menu_price}
                    </Typography>
                    <div style={{ paddingTop: "20px" }}>
                      <TextField
                        type="number"
                        label="Quantity"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item._id,
                            parseInt(e.target.value)
                          )
                        }
                        inputProps={{ min: "1", step: "1" }}
                        style={{ width: "150px" }}
                      />
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => removeFromCart(item._id)}
                        style={{ marginLeft: "8px", height: "56px" }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </Paper>
              </div>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Paper
              elevation={3}
              style={{ marginBottom: 5, padding: 30, textAlign: "right" }}
            >
              <Typography variant="h6">Cart Summary</Typography>
              <Typography>Total Items: {cart.length}</Typography>
              <Typography sx={{ paddingBottom: 2 }}>
                Total Price: ${totalPrice.toFixed(2)}
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="promo-select-label">Promo Code</InputLabel>
                <Select
                  labelId="promo-select-label"
                  value={selectedPromo ? selectedPromo._id : ""}
                  onChange={handlePromoChange}
                  label="Promo Code"
                >
                  {promos.map((promo) => (
                    <MenuItem key={promo._id} value={promo._id}>
                      {promo.promo_code} - Discount: ${promo.promo_price}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCheckout}
                style={{ width: "156px", marginTop: "16px" }}
              >
                Checkout
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart;
