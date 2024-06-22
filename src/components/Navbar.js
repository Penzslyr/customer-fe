import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const baseURL = "http://localhost:4000/";
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { cart } = useCart();
  const { isLoggedIn, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          onClick={() => navigate("/")}
        >
          MyApp
        </Typography>
        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        {isLoggedIn ? (
          <div>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <Avatar
                // alt="Profile Picture"
                // src="https://via.placeholder.com/150"
                src={`${baseURL}${user?.profileImage?.filepath}`}
                alt={user?.profileImage?.filename}
              />

              <Typography
                variant="subtitle1"
                component="div"
                sx={{ paddingLeft: "10px" }}
              >
                {user?.fullname}
              </Typography>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/profile">
                Edit Profile
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="/transactions"
              >
                Transaction History
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={Link}
                to="/changepassword"
              >
                Change Password
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
