import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { LIGHT_BLACK } from "../styles/colors";

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <SectionTitleContainer>
      <Title variant="h5">{title}</Title>
    </SectionTitleContainer>
  );
};

const Title = styled(Typography)(() => ({
  color: LIGHT_BLACK,
  marginBottom: "25px",
  fontWeight: 400,
}));

const SectionTitleContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  margin: "20px 0",
}));

export default SectionTitle;
