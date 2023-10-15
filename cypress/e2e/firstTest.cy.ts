/// <reference types="cypress" />

import awsconfig from "../../src/aws-exports";
describe("zeller customer app", () => {
  beforeEach(() => {
    // This will run before each test, navigating to your page.
    cy.visit("http://localhost:3000/");
  });

  it("render default text and section ", () => {
    //should contain the titles
    cy.contains(/User types/i);
    cy.contains(/All Users/i);

    //should have both section
    cy.get('[data-testid="user-types-section"]').should("exist");
    cy.get('[data-testid="role-user-section"]').should("exist");
  });

  it("render all customers card on screen", () => {
    //mock the graphql api data
    cy.intercept("POST", awsconfig.aws_appsync_graphqlEndpoint, {
      fixture: "allUsers.json",
    }).as("graphqlCall");

    // Wait for the GraphQL call to complete
    cy.wait("@graphqlCall");

    // Should render more than 1 customer cards
    cy.get('[data-testid^="CustomerCard-"]').should("have.length.gt", 0);
  });

  it("test click manager radio button to show Manager Users text", () => {
    //mock the graphql api data
    cy.intercept("POST", awsconfig.aws_appsync_graphqlEndpoint, {
      fixture: "managerUsers.json",
    }).as("graphqlCall");

    //Admin radio clicked
    cy.get('input[type="radio"][value="MANAGER"]').click();

    // Wait for the GraphQL call to complete
    cy.wait("@graphqlCall");

    //have data returned and show
    cy.get('[data-testid^="CustomerCard-"]').should("have.length.gt", 0);

    //change title to be manager users
    cy.contains(/Manager Users/i);
  });

  it("test click admin radio button to show Admin Users text", () => {
    //mock the graphql api data
    cy.intercept("POST", awsconfig.aws_appsync_graphqlEndpoint, {
      fixture: "adminUsers.json",
    }).as("graphqlCall");

    //Admin radio clicked
    cy.get('input[type="radio"][value="ADMIN"]').click();

    // Wait for the GraphQL call to complete
    cy.wait("@graphqlCall");

    //have data returned and show
    cy.get('[data-testid^="CustomerCard-"]').should("have.length.gt", 0);

    //change title to be manager users
    cy.contains(/Admin Users/i);
  });

  it("test if customer role match the radio selected role -Admin", () => {
    //mock the graphql api data
    cy.intercept("POST", awsconfig.aws_appsync_graphqlEndpoint, {
      fixture: "adminUsers.json",
    }).as("graphqlCall");

    //Admin radio clicked
    cy.get('input[type="radio"][value="ADMIN"]').click();

    // Wait for the GraphQL call to complete
    cy.wait("@graphqlCall");

    //check if all the customer role is Admin
    cy.get('[data-testid="CustomerRole"]').then(($roles) => {
      $roles.each((index, role) => {
        expect(role).to.have.text("Admin");
      });
    });
  });

  it("test if customer role match the radio selected role -Manager", () => {
    //mock the graphql api data
    cy.intercept("POST", awsconfig.aws_appsync_graphqlEndpoint, {
      fixture: "managerUsers.json",
    }).as("graphqlCall");

    //Manager radio clicked
    cy.get('input[type="radio"][value="MANAGER"]').click();

    // Wait for the GraphQL call to complete
    cy.wait("@graphqlCall");

    //check if all the customer role is Manager
    cy.get('[data-testid="CustomerRole"]').then(($roles) => {
      $roles.each((index, role) => {
        expect(role).to.have.text("Manager");
      });
    });
  });
});
