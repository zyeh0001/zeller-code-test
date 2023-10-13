import React from "react";
import { render, screen } from "@testing-library/react";
import CustomerCard from "./CustomerCard";
import { Customer } from "../interfaces";
import { capitalizeFirstLetter } from "../utils/textUtils";
import "@testing-library/jest-dom";

describe("<CustomerCard />", () => {
  it("renders the customer name and role correctly", () => {
    const mockCustomer: Customer = {
      id: "f47813cf-0482-4326-afc9-12f53218ed06",
      name: "Lynn Warr",
      email: "lynn@gmail.com",
      role: "MANAGER",
    };

    render(<CustomerCard customer={mockCustomer} />);

    //check the name and role is rendered
    expect(screen.getByText(mockCustomer.name)).toBeInTheDocument();
    expect(
      screen.getByText(capitalizeFirstLetter(mockCustomer.role))
    ).toBeInTheDocument();
  });
});
