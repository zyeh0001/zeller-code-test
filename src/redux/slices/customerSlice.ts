import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Customer, CustomerData, GraphQLResponse } from "../../interfaces";
import { API, graphqlOperation } from "aws-amplify";
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
    try {
      const response = (await API.graphql(
        graphqlOperation(ListZellerCustomersByRole(role))
      )) as GraphQLResponse<CustomerData>;
      return response.data.listZellerCustomers.items;
    } catch (error: any) {
      throw error;
    }
  }
);

export const fetchAllCustomers = createAsyncThunk(
  "customer/fetchAllCustomers",
  async () => {
    try {
      const response = (await API.graphql(
        graphqlOperation(ListZellerCustomers)
      )) as GraphQLResponse<CustomerData>;
      return response.data.listZellerCustomers.items;
    } catch (error: any) {
      throw error;
    }
  }
);

const customerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetCustomers: (state: Customers) => initialState,
  },
  extraReducers: (builder) => {
    // fetchCustomerByRole
    builder
      .addCase(fetchCustomerByRole.pending, (state, _) => {
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
      .addCase(fetchAllCustomers.pending, (state, _) => {
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
