import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Customers from "./Customers";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";

jest.mock("aws-amplify", () => ({
  API: {
    graphql: jest.fn(),
  },
  graphqlOperation: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("<Customers />", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      customers: {
        customers: [],
        loading: false,
        error: null,
      },
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders loading state when waiting", () => {
    store = mockStore({
      customers: {
        customers: [],
        loading: true,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Customers />
      </Provider>
    );

    //progressbar
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders error state when error", () => {
    const errorMessage = "An error occurred.";
    store = mockStore({
      customers: {
        customers: [],
        loading: false,
        error: errorMessage,
      },
    });

    render(
      <Provider store={store}>
        <Customers />
      </Provider>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("renders customer cards", () => {
    const mockCustomers = [
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
      {
        email: "ryan@gmail.com",
        id: "0c90ecd4-d159-4335-9377-f29ee6829847",
        name: "Ryan Muller",
        role: "ADMIN",
      },
      {
        email: "joe@gmail.com",
        id: "edc033b9-ba6c-4857-9ff9-85c52ad39ef9",
        name: "Joe Perera",
        role: "MANAGER",
      },
      {
        email: "cris@gmail.com",
        id: "24d34832-7c10-4c91-a582-32a0222125c0",
        name: "Chris Miller",
        role: "ADMIN",
      },
    ];
    store = mockStore({
      customers: {
        customers: mockCustomers,
        loading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Customers />
      </Provider>
    );
    //test to see if it renders all customer cards
    mockCustomers.forEach((customer) => {
      expect(screen.getByText(customer.name)).toBeInTheDocument();
    });
  });
});
