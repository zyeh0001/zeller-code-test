import { authReducer, resetAuth, changeRole } from "./authSlice";
import "@testing-library/jest-dom";
import { Auth } from "../../interfaces";

describe("authSlice", () => {
  let initialState: Auth;

  beforeEach(() => {
    initialState = {
      role: "All",
    };
  });

  it("should reset auth to initial state", () => {
    const modifiedState: Auth = {
      role: "ADMIN",
    };

    // Dispatch the reset action to the reducer
    const newState = authReducer(modifiedState, resetAuth());

    // Verify the state was reset
    expect(newState).toEqual(initialState);
  });

  it("should handle changing the user's role", () => {
    const newRole = "MANAGER";

    // Dispatch the changeRole action to the reducer
    const newState = authReducer(initialState, changeRole(newRole));

    // Verify the role was changed
    expect(newState.role).toBe(newRole);
  });
});
