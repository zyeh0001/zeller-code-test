import React from "react";
import { Avatar } from "@mui/material";
import { Customer } from "../interfaces/index";
import Tooltip from "@mui/material/Tooltip";
import { LIGHT_BLUE, BLUE } from "../styles/colors";
import { Font } from "../styles/fonts";

interface CustomerAvatarProps {
  customer: Customer;
}

const CustomerAvatar = ({ customer }: CustomerAvatarProps) => {
  return (
    <Tooltip title={customer.email}>
      <Avatar {...stringAvatar(customer.name)} variant="rounded" />
    </Tooltip>
  );
};

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: LIGHT_BLUE,
      color: BLUE,
      fontSize: Font.large,
    },
    children: `${name.split(" ")[0][0]}`,
  };
}

export default CustomerAvatar;
