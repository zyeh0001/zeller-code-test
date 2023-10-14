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

  it("render customers card on screen", () => {
    //should render more than 1 customer cards
    cy.get('[data-testid^="CustomerCard-"]', { timeout: 10000 }).should(
      "have.length.gt",
      0
    );
  });

  it("test click manager radio button to show Manager Users text", () => {
    //Admin radio clicked
    cy.get('input[type="radio"][value="MANAGER"]').click();

    cy.wait(3000);

    //have data returned and show
    cy.get('[data-testid^="CustomerCard-"]', { timeout: 10000 }).should(
      "have.length.gt",
      0
    );

    //change title to be manager users
    cy.contains(/Manager Users/i);
  });

  it("test click admin radio button to show Admin Users text", () => {
    //Admin radio clicked
    cy.get('input[type="radio"][value="ADMIN"]').click();

    cy.wait(3000);

    //have data returned and show
    cy.get('[data-testid^="CustomerCard-"]', { timeout: 10000 }).should(
      "have.length.gt",
      0
    );

    //change title to be manager users
    cy.contains(/Admin Users/i);
  });

  it("test if customer role match the radio selected role -Admin", () => {
    cy.intercept("POST", awsconfig.aws_appsync_graphqlEndpoint).as(
      "graphqlCall"
    );
    //Admin radio clicked
    cy.get('input[type="radio"][value="ADMIN"]').click();

    cy.wait(3000);

    //check if all the customer role is Admin
    cy.get('[data-testid="CustomerRole"]').then(($roles) => {
      $roles.each((index, role) => {
        expect(role).to.have.text("Admin");
      });
    });
  });

  it("test if customer role match the radio selected role -Manager", () => {
    cy.intercept("POST", awsconfig.aws_appsync_graphqlEndpoint).as(
      "graphqlCall"
    );
    //Manager radio clicked
    cy.get('input[type="radio"][value="MANAGER"]').click();

    cy.wait(3000);

    //check if all the customer role is Manager
    cy.get('[data-testid="CustomerRole"]').then(($roles) => {
      $roles.each((index, role) => {
        expect(role).to.have.text("Manager");
      });
    });
  });
});
