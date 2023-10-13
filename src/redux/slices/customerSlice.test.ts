import {
  fetchAllCustomers,
  fetchCustomerByRole,
  resetCustomers,
  customerReducer,
} from "./customerSlice";
import { API } from "aws-amplify";
import "@testing-library/jest-dom";
import { Customer } from "../../interfaces";

jest.mock("aws-amplify", () => ({
  API: {
    graphql: jest.fn(),
  },
}));

interface Customers {
  customers: Customer[];
  loading: boolean;
  error: string | undefined;
}

describe("customerSlice", () => {
  let initialState: Customers;

  beforeEach(() => {
    initialState = {
      customers: [],
      loading: false,
      error: "",
    };
  });

  it("should reset customers to initial state", () => {
    // Setup a modified state
    const modifiedState = {
      customers: [
        {
          email: "david@gmail.com",
          id: "73bae2af-4fa4-4023-8829-1034604e7590",
          name: "David Miller",
          role: "ADMIN",
        },
      ],
      loading: false,
      error: "",
    };

    // Dispatch the reset action to the reducer
    const newState = customerReducer(modifiedState, resetCustomers());

    // Verify the state was reset
    expect(newState).toEqual(initialState);
  });

  it("should handle the fulfilled state for fetchAllCustomers", async () => {
    const mockData = {
      data: {
        listZellerCustomers: {
          items: [
            {
              email: "lynn@gmail.com",
              id: "f47813cf-0482-4326-afc9-12f53218ed06",
              name: "Lynn Warr",
              role: "MANAGER",
            },
            {
              email: "david@gmail.com",
              id: "73bae2af-4fa4-4023-8829-1034604e7590",
              name: "David Miller",
              role: "ADMIN",
            },
          ],
        },
      },
    };

    (API.graphql as jest.Mock).mockResolvedValueOnce(mockData);

    // Since we're not using `mockStore`, we won't dispatch thunks.
    // But we can simulate their effects on the state by dispatching their actions.
    const newState = customerReducer(
      initialState,
      fetchAllCustomers.fulfilled(
        mockData.data.listZellerCustomers.items,
        "",
        undefined
      ) // the second and third params are the action meta and payload condition respectively, which aren't used here
    );

    expect(newState.customers).toEqual(mockData.data.listZellerCustomers.items);
    expect(newState.loading).toBe(false);
  });

  it("should handle the fulfilled state for fetchCustomersByRole", async () => {
    const role = "ADMIN";
    const mockData = {
      data: {
        listZellerCustomers: {
          items: [
            {
              email: "lynn@gmail.com",
              id: "f47813cf-0482-4326-afc9-12f53218ed06",
              name: "Lynn Warr",
              role: role,
            },
            {
              email: "david@gmail.com",
              id: "73bae2af-4fa4-4023-8829-1034604e7590",
              name: "David Miller",
              role: role,
            },
          ],
        },
      },
    };

    (API.graphql as jest.Mock).mockResolvedValueOnce(mockData);

    // Since not using `mockStore`,it won't dispatch thunks.
    // Simulate the effects on the state by dispatching actions.
    const newState = customerReducer(
      initialState,
      fetchCustomerByRole.fulfilled(
        mockData.data.listZellerCustomers.items,
        "",
        role //payload send to actions
      )
    );

    expect(newState.customers).toEqual(mockData.data.listZellerCustomers.items);
    expect(newState.loading).toBe(false);
  });

  it("should handle the loading state for fetchCustomersByRole and fetchAllCustomers to be pending", () => {
    // Simulate fetching by role loading state
    let newState = customerReducer(
      initialState,
      fetchCustomerByRole.pending("", "")
    );
    expect(newState.loading).toBe(true);

    // Reset the state for the next action
    newState = initialState;

    // Simulate fetching all customers loading state
    newState = customerReducer(
      initialState,
      fetchAllCustomers.pending("", undefined)
    );
    expect(newState.loading).toBe(true);
  });

  it("should handle the error state for fetchCustomersByRole and fetchAllCustomers to be rejected", () => {
    const mockError = "An error occurred";

    // Simulate fetching by role error state
    let newState = customerReducer(
      initialState,
      fetchCustomerByRole.rejected(new Error(mockError), "", "")
    );
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(mockError);

    // Reset the state for the next action
    newState = initialState;

    // Simulate fetching all customers error state
    newState = customerReducer(
      initialState,
      fetchAllCustomers.rejected(new Error(mockError), "", undefined)
    );
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(mockError);
  });
});
