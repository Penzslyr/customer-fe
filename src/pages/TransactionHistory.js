// src/pages/TransactionHistory.js
import React from "react";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

const TransactionHistory = () => {
  const transactions = [
    {
      id: 1,
      date: "2023-06-01",
      items: [
        { name: "Menu 1", quantity: 2, price: 20 },
        { name: "Menu 3", quantity: 1, price: 3 },
      ],
      total: 23,
    },
    {
      id: 2,
      date: "2023-06-10",
      items: [{ name: "Menu 2", quantity: 1, price: 5 }],
      total: 5,
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Transaction History
      </Typography>
      {transactions.map((transaction) => (
        <Paper
          key={transaction.id}
          elevation={3}
          style={{ padding: 16, marginBottom: 16 }}
        >
          <Typography variant="h6">
            Transaction Date: {transaction.date}
          </Typography>
          <List>
            {transaction.items.map((item, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar>{item.name.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${item.name} - ${item.quantity} pcs`}
                  secondary={`Price: $${item.price * item.quantity}`}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="body1">Total: ${transaction.total}</Typography>
        </Paper>
      ))}
    </Container>
  );
};

export default TransactionHistory;
