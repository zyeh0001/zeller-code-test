import React from "react";
import { useAppSelector } from "../hooks/useRedux";
import Customers from "../components/Customers";
import UserType from "../components/UserType";
import SectionTitle from "../components/SectionTitle";
import { capitalizeFirstLetter } from "../utils/textUtils";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import CustomDivider from "../components/CustomDivider";

const Home: React.FC = () => {
  const role = useAppSelector((state) => state.auth.role);

  return (
    <HomeContainer>
      <Section data-testid="user-types-section">
        <SectionTitle title={"User Types"} />
        <UserType />
        <CustomDivider />
      </Section>
      <Section data-testid="role-user-section">
        <SectionTitle title={`${capitalizeFirstLetter(role)} Users`} />
        <Customers />
        <CustomDivider />
      </Section>
    </HomeContainer>
  );
};

const HomeContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  padding: "20px 40px",
}));

const Section = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
}));

export default Home;
