import React from "react";
import { Avatar } from "@mui/material";
import { Customer } from "../interfaces/index";
import Tooltip from "@mui/material/Tooltip";
import { LIGHT_BLUE, BLUE, WHITE } from "../styles/colors";
import { Font } from "../styles/fonts";
import { capitalizeFirstLetter } from "utils/textUtils";
import { Card, Typography } from "@mui/material";
import styled from "@emotion/styled";

interface CustomerAvatarProps {
  customer: Customer;
}

const CustomerAvatar = ({ customer }: CustomerAvatarProps) => {
  return (
    <Tooltip
      sx={{ background: WHITE }}
      title={<CustomerDetailInfo customer={customer} />}
    >
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

type CustomerDetailInfoProps = { customer: Customer };
const CustomerDetailInfo = ({ customer }: CustomerDetailInfoProps) => {
  return (
    <CustomerDetailContainer>
      <Avatar
        alt="George bush"
        src="https://www.w3schools.com/howto/img_avatar.png"
      />
      <br />
      <Typography sx={{ fontSize: Font.large }}>{customer.name}</Typography>
      <Typography sx={{ fontSize: Font.regular }}>{customer.email}</Typography>
      <Typography sx={{ fontSize: Font.regular }}>
        {capitalizeFirstLetter(customer.role)}
      </Typography>
    </CustomerDetailContainer>
  );
};

const CustomerDetailContainer = styled(Card)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px 40px",
  border: "none",
}));

export default CustomerAvatar;
