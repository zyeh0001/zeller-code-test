import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import "@testing-library/jest-dom";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

jest.mock("aws-amplify", () => ({
  API: {
    graphql: jest.fn(),
  },
  graphqlOperation: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("App component", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      auth: {
        role: "All",
      },
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

  test('should render Home component for "/" route', () => {
    store = mockStore({
      auth: {
        role: "All",
      },
      customers: {
        customers: [],
        loading: false,
        error: null,
      },
    });
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/User Types/i)).toBeInTheDocument();
    expect(screen.getByText(/All Users/i)).toBeInTheDocument();
  });

  test('should render PageNotFound component for "/404" route', () => {
    store = mockStore({
      auth: {
        role: "All",
      },
      customers: {
        customers: [],
        loading: false,
        error: null,
      },
    });
    render(
      <MemoryRouter initialEntries={["/404"]}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Page Not Found - 404/i)).toBeInTheDocument();
  });
});
