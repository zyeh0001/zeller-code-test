import React from "react";
import { LIGHT_BLUE } from "../styles/colors";
import { Divider } from "@mui/material";

const CustomDivider: React.FC = () => {
  return <Divider sx={{ background: LIGHT_BLUE, margin: "20px 0" }} />;
};

export default CustomDivider;
