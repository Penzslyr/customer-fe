import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const TransactionHistory = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = user._id; // you can also get this from context if it's dynamic

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/transactions/getbyuser/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setTransactions(response.data);
        console.log(response);
        console.log(user);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <Container
        sx={{
          minHeight: "725px",
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ minHeight: "725px", marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Transaction History
      </Typography>
      {transactions.length === 0 ? (
        <Typography variant="body1">No transactions found.</Typography>
      ) : (
        transactions.map((transaction) => (
          <Paper
            key={transaction._id}
            elevation={3}
            style={{ padding: 16, marginBottom: 16 }}
          >
            <Typography variant="h6">
              Transaction Date:{" "}
              {new Date(transaction.t_date).toLocaleDateString()}
            </Typography>
            <List>
              {transaction.t_items.map((item, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar
                      src={`http://localhost:4000/${item.menu_id.menu_img.filepath}`}
                      sx={{ width: 45, height: 45 }}
                    >
                      {item.menu_name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${item.menu_name} - ${item.quantity} pcs`}
                    secondary={`Price: $${item.price * item.quantity}`}
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant="body1">
              Total: ${transaction.t_total}
            </Typography>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default TransactionHistory;
