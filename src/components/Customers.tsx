import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import {
  fetchAllCustomers,
  resetCustomers,
} from "../redux/slices/customerSlice";
import CustomerCard from "./CustomerCard";
import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorComponent from "./ErrorComponent";

const Customers: React.FC = () => {
  const dispatch = useAppDispatch();
  const { customers, loading, error } = useAppSelector(
    (state) => state.customers
  );

  useEffect(() => {
    dispatch(fetchAllCustomers());
    return () => {
      dispatch(resetCustomers());
    };
  }, [dispatch]);

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return !loading ? (
    <div>
      <Stack sx={{ display: "flex", flexWrap: "wrap" }} direction="row">
        {customers.map((customer) => (
          <CustomerCard customer={customer} key={customer.id} />
        ))}
      </Stack>
    </div>
  ) : (
    <>
      <CircularProgress />
    </>
  );
};

export default Customers;
