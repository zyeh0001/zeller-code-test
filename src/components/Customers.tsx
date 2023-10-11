import React, { useState, useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { ListZellerCustomers, ListZellerCustomersByRole } from "../api/queries";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import {
  fetchAllCustomers,
  fetchCustomerByRole,
} from "../redux/slices/customerSlice";
import { changeRole } from "../redux/slices/authSlice";

const Customers: React.FC = () => {
  const dispatch = useAppDispatch();
  const { customers } = useAppSelector((state) => state.customers);
  const { role } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllCustomers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCustomerByRole(role));
  }, [dispatch, role]);

  return (
    <div>
      <input
        type="radio"
        name="userType"
        value="Admin"
        checked={role === "Admin"}
        onChange={() => dispatch(changeRole("Admin"))}
      />{" "}
      Admin
      <input
        type="radio"
        name="userType"
        value="Manager"
        checked={role === "Manager"}
        onChange={() => dispatch(changeRole("Manager"))}
      />{" "}
      Manager
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.name} ({customer.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Customers;
