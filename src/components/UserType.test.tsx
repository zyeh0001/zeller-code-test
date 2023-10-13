import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import UserType from "./UserType";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";

//mock amplify
jest.mock("aws-amplify", () => ({
  API: {
    graphql: jest.fn(),
  },
  graphqlOperation: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("<UserType/>", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      auth: {
        role: "All",
      },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render the component", () => {
    store = mockStore({
      auth: {
        role: "All",
      },
    });

    render(
      <Provider store={store}>
        <UserType />
      </Provider>
    );

    // Check if the Admin and Manager Radio is rendering
    expect(screen.getByLabelText("Admin")).toBeInTheDocument();
    expect(screen.getByLabelText("Manager")).toBeInTheDocument();
  });

  it("should checked the Admin radio button when it is clicked", async () => {
    store = mockStore({
      auth: {
        role: "All",
      },
    });

    render(
      <Provider store={store}>
        <UserType />
      </Provider>
    );

    // Get the Admin radio button element using findByRole
    const adminRadio = await screen.findByRole("radio", { name: /admin/i });

    // Click the Admin radio button
    fireEvent.click(adminRadio);

    // Expect the Admin radio button to be selected
    expect(adminRadio).toBeChecked();
  });

  it("should checked the Manager radio button when it is clicked", async () => {
    store = mockStore({
      auth: {
        role: "All",
      },
    });

    render(
      <Provider store={store}>
        <UserType />
      </Provider>
    );

    // Get the Admin radio button element using findByRole
    const adminRadio = await screen.findByRole("radio", { name: /manager/i });

    // Click the Admin radio button
    fireEvent.click(adminRadio);

    // Expect the Admin radio button to be selected

    expect(adminRadio).toBeChecked();
  });

  it("should dispatch changeRole when radio button is clicked", async () => {
    // Create a mock store
    store = mockStore({
      auth: { role: "All" },
    });

    render(
      <Provider store={store}>
        <UserType />
      </Provider>
    );

    // Get the Admin radio button element using getByRole
    const adminRadio = screen.getByRole("radio", { name: /admin/i });

    // Click the Admin radio button
    fireEvent.click(adminRadio);

    // Get the actions dispatched to the mock store
    const actions = store.getActions();

    // Expect the changeRole action to have been dispatched with the correct payload
    expect(actions).toContainEqual({
      type: "auth/changeRole",
      payload: "ADMIN",
    });
  });
});
