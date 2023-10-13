import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";
import { LIGHT_BLACK } from "../styles/colors";
import { Font } from "../styles/fonts";

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <SectionTitleContainer>
      <Title>{title}</Title>
    </SectionTitleContainer>
  );
};

const Title = styled(Typography)(() => ({
  fontSize: Font.extraLarge,
  color: LIGHT_BLACK,
  marginBottom: "10px",
  fontWeight: 400,
}));

const SectionTitleContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  margin: "20px 0",
}));

export default SectionTitle;
