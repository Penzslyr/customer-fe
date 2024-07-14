// src/components/Footer.js
import React from "react";
import { Container, Typography, Link, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        padding: "1rem 0",
        marginTop: "2rem",
      }}
    >
      <Container>
        <Typography variant="body1" align="center">
          © 2024 Angkringan Bonsuwong
        </Typography>
        <Typography
          variant="body2"
          align="center"
          style={{ paddingTop: "20px" }}
        >
          <Link
            href="/about"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            About Us
          </Link>{" "}
          |
          <Link
            href="/contact"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            {} Contact
          </Link>{" "}
          |
          <Link
            href="/privacy"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            {} Privacy Policy
          </Link>
        </Typography>
        <Typography
          variant="body2"
          align="center"
          style={{ marginTop: "20px" }}
        >
          <Link
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            View us on Google Maps
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
