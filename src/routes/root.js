import { CssBaseline, Box, Toolbar } from "@mui/material";

import { Outlet } from "react-router-dom";
import Navbar from "..Navbar/components/Navbar";

export default function Root() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar/>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          minWidth: "185vh",
          overflow: "auto",
          width: 1,
          paddingX: "24px",
          paddingBottom: "24px",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
