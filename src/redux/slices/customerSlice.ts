import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Customer, CustomerData, GraphQLResponse } from "../../interfaces";
import { graphqlOperation, API } from "aws-amplify";
import {
  ListZellerCustomers,
  ListZellerCustomersByRole,
} from "../../api/queries"; // Ensure correct path

interface Customers {
  customers: Customer[];
  loading: boolean;
  error: string | undefined;
}

const initialState: Customers = {
  customers: [],
  loading: false,
  error: "",
};

export const fetchCustomerByRole = createAsyncThunk(
  "customer/fetchCustomerByRole",
  async (role: string) => {
    const response = (await API.graphql(
      graphqlOperation(ListZellerCustomersByRole, { role })
    )) as GraphQLResponse<CustomerData>;
    return response.data.listZellerCustomers.items;
  }
);

export const fetchAllCustomers = createAsyncThunk(
  "customer/fetchAllCustomers",
  async () => {
    const response = (await API.graphql(
      graphqlOperation(ListZellerCustomers)
    )) as GraphQLResponse<CustomerData>;

    return response.data.listZellerCustomers.items;
  }
);

const customerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetCustomers: () => initialState,
  },
  extraReducers: (builder) => {
    // fetchCustomerByRole
    builder
      .addCase(fetchCustomerByRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomerByRole.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchCustomerByRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // fetchAllCustomers
    builder
      .addCase(fetchAllCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload;
      })
      .addCase(fetchAllCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetCustomers } = customerSlice.actions;
export const customerReducer = customerSlice.reducer;
