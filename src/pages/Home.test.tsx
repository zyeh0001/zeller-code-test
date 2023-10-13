import { render, screen } from "@testing-library/react";
import Home from "./Home";
import "@testing-library/jest-dom";
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

describe("<Home/>", () => {
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

  it("Render two separate section", async () => {
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
      <Provider store={store}>
        <Home />
      </Provider>
    );

    //show two sections
    expect(screen.getByTestId("user-types-section")).toBeInTheDocument();
    expect(screen.getByTestId("role-user-section")).toBeInTheDocument();

    //render "User Types" and "All Users"
    expect(screen.getByText(/User Types/i)).toBeInTheDocument();
    expect(await screen.findByText(/All Users/i)).toBeInTheDocument();
  });
});
