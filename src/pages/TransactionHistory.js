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
  TextField,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const TransactionHistory = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = user._id; // you can also get this from context if it's dynamic
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `https://angkringan-backend.vercel.app/api/transactions/getbyuser/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setTransactions(response.data);
        setFilteredTransactions(response.data); // Initialize filtered transactions with all transactions
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  useEffect(() => {
    if (!startDate && !endDate) {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter((transaction) => {
        const transactionDate = dayjs(transaction.t_date);
        return (
          (!startDate ||
            transactionDate.isAfter(startDate.subtract(1, "day"))) &&
          (!endDate || transactionDate.isBefore(endDate.add(1, "day")))
        );
      });
      setFilteredTransactions(filtered);
    }
  }, [startDate, endDate, transactions]);

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
      <Typography variant="h6" gutterBottom>
        Choose range date of the transactions
      </Typography>
      <div style={{ display: "flex", marginTop: 10, marginBottom: 20 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <div style={{ padding: 10 }} />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      {filteredTransactions.length === 0 ? (
        <Typography variant="body1">No transactions found.</Typography>
      ) : (
        filteredTransactions.map((transaction) => (
          <Paper
            key={transaction._id}
            elevation={3}
            style={{ padding: 16, marginBottom: 16 }}
          >
            <Typography variant="h6">
              Transaction Date : {}
              {dayjs
                .utc(transaction.t_date)
                .tz("Asia/Jakarta")
                .format("MMMM D, YYYY h:mm A")
                .toString()}
            </Typography>
            <List>
              {transaction.t_items.map((item, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar
                      src={`${item.menu_id.menu_img.filepath}`}
                      sx={{ width: 45, height: 45 }}
                    >
                      {item.menu_name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${item.menu_name} - ${item.quantity} pcs`}
                    secondary={`Price: Rp.${item.price * item.quantity}`}
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant="body1">
              Status: {transaction.t_status}
            </Typography>
            <Typography variant="body1">
              Total: Rp. {transaction.t_total}
            </Typography>
          </Paper>
        ))
      )}
    </Container>
  );
};

export default TransactionHistory;
