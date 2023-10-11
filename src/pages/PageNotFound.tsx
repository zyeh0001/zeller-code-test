import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import { WHITE } from "../styles/colors";

const PageNotFound = () => {
  //   const { selectedTheme } = useSelector((state) => state.settings);

  return (
    <Box
      sx={{
        // backgroundColor: getAppBackgroundColor(selectedTheme),
        backgroundColor: WHITE,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            minHeight: "calc(100vh - 70px)",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          pt="90px"
        >
          <Typography variant="h4" mb="20px" color="text.primary">
            Page Not Found - 404
          </Typography>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default PageNotFound;
