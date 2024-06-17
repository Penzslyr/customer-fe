import React from "react";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity < 1) return;
    updateQuantity(itemId, quantity);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  console.log(cart);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {cart.map((item) => (
              <Paper
                elevation={3}
                key={item.id}
                style={{ padding: 16, display: "flex" }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100px",
                    height: "auto",
                    marginRight: "16px",
                  }}
                />
                <div style={{ flexGrow: 1 }}>
                  {" "}
                  {/* Allow description area to grow */}
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1">{item.category}</Typography>
                  <Typography variant="body1">Price: {item.price}</Typography>
                  <div style={{ paddingTop: "20px" }}>
                    <TextField
                      type="number"
                      label="Quantity"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      inputProps={{ min: "1", step: "1" }}
                      style={{ width: "150px" }}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => removeFromCart(item.id)}
                      style={{ marginLeft: "8px", height: "56px" }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </Paper>
            ))}
          </Grid>
          <Grid item xs={12}>
            {" "}
            {/* Moved total price section to a separate row */}
            <Paper elevation={3} style={{ padding: 16, textAlign: "right" }}>
              <Typography variant="h6">Cart Summary</Typography>
              <Typography>Total Items: {cart.length}</Typography>
              <Typography>Total Price: ${calculateTotalPrice()}</Typography>
              {/* Add a button for checkout or other actions here */}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart;
