import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import "@testing-library/jest-dom";

describe("<PageNotFound />", () => {
  const renderPageNotFound = () => {
    render(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );
  };
  it("renders Page Not Found text", () => {
    renderPageNotFound();

    expect(screen.getByText(/Page Not Found - 404/i)).toBeInTheDocument();
  });

  it("renders Go Home button", () => {
    renderPageNotFound();

    const goHomeButton = screen.getByText(/Go Home/i);
    expect(goHomeButton).toBeInTheDocument();
  });

  it("Go Home button navigates to /", () => {
    renderPageNotFound();

    const goHomeButton = screen.getByText(/Go Home/i);
    fireEvent.click(goHomeButton);

    expect(window.location.pathname).toBe("/");
  });
});
