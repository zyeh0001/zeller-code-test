import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CustomerAvatar from "./CustomerAvatar";
import { Customer } from "../interfaces";
import styled from "@emotion/styled";
import { GREY, LIGHT_BLACK } from "../styles/colors";
import { Font } from "../styles/fonts";
import { capitalizeFirstLetter } from "../utils/textUtils";

interface CustomerCardProps {
  customer: Customer;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => {
  return (
    <CustomCard data-testid={`CustomerCard-${customer.id}`}>
      <CustomCardContent>
        <CustomerAvatar customer={customer} />
        <CustomerDetail>
          <NameTypography>{customer.name}</NameTypography>
          <RoleTypography data-testid={`CustomerRole`}>
            {capitalizeFirstLetter(customer.role)}
          </RoleTypography>
        </CustomerDetail>
      </CustomCardContent>
    </CustomCard>
  );
};

const CustomCard = styled(Card)(() => ({
  border: "none",
  boxShadow: "none",
}));

const CustomCardContent = styled(CardContent)(() => ({
  display: "flex",
  alignItems: "center",
}));

const CustomerDetail = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  marginLeft: "8px",
}));

const NameTypography = styled(Typography)(() => ({
  fontSize: Font.large,
  color: LIGHT_BLACK,
  margin: 0,
}));

const RoleTypography = styled(Typography)(() => ({
  fontSize: Font.small,
  color: GREY,
  margin: 0,
}));

export default CustomerCard;
