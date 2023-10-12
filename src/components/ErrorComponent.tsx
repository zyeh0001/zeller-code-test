import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { DARK_RED } from "../styles/colors";

interface ErrorComponentProps {
  error: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => {
  return (
    <ErrorContainer>
      <Title variant="h6">{error}</Title>
    </ErrorContainer>
  );
};

const Title = styled(Typography)(() => ({
  color: DARK_RED,
}));

const ErrorContainer = styled(Box)(() => ({
  display: "flex",
  alignItem: "center",
  margin: "20px 0",
}));

export default ErrorComponent;
