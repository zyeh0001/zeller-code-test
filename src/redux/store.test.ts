import store from "./store"; // adjust the path

import "@testing-library/jest-dom";

jest.mock("aws-amplify", () => ({
  API: {
    graphql: jest.fn(),
  },
  graphqlOperation: jest.fn(),
}));

describe("store", () => {
  it("should have the correct keys", () => {
    const keys = Object.keys(store.getState());
    expect(keys).toEqual(["auth", "customers"]);
  });

  it("should initialize with the correct default state", () => {
    const state = store.getState();
    expect(state.auth).toEqual({ role: "All" });
    expect(state.customers).toEqual({
      customers: [],
      loading: false,
      error: "",
    });
  });

  it("should handle state changes from multiple reducers", () => {
    // Test change role action on Auth state
    store.dispatch({ type: "auth/changeRole", payload: "ADMIN" });
    let newState = store.getState();
    expect(newState.auth.role).toBe("ADMIN");

    // Test Reset auth action on Auth state
    store.dispatch({ type: "auth/resetAuth" });
    newState = store.getState();
    expect(newState.auth.role).toBe("All");

    // Test reset customers action on customers state
    store.dispatch({ type: "customers/resetCustomers" });
    newState = store.getState();
    expect(newState.customers).toEqual({
      customers: [],
      loading: false,
      error: "",
    });
  });
});
