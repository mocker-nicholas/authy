// Arrange Act Assert
describe("Page Loads", () => {
  // The page loads
  it("Landing Page Renders", () => {
    cy.openLandingPage();
  });

  it("The first card has the correct content", () => {
    cy.get('[data-cy="card-1"]').should("exist");
    cy.get('[data-cy="card-1"]')
      .find("h3")
      .should("contain", "Mobile Friendly");
    cy.get('[data-cy="card-1"]')
      .find("p")
      .should("contain", "Take payments from any device");
  });

  it("The second card has the correct content", () => {
    cy.get('[data-cy="card-2"]').should("exist");
    cy.get('[data-cy="card-2"]').find("h3").should("contain", "Secure");
    cy.get('[data-cy="card-2"]')
      .find("p")
      .should("contain", "Stay PCI compliant with hosted payments");
  });

  it("The third card has the correct content", () => {
    cy.get('[data-cy="card-3"]').should("exist");
    cy.get('[data-cy="card-3"]').find("h3").should("contain", "Collect");
    cy.get('[data-cy="card-3"]')
      .find("p")
      .should("contain", "Reach your customers in more ways");
  });

  it("The button to continue to the main app is there", () => {
    cy.get('[data-cy="app-button"]').should("exist");
    cy.get('[data-cy="app-button"]').should("contain", "Continue to App");
  });

  // The Link component correctly brings you to /home route
  it("Button brings you to app homepage", () => {
    cy.get('[data-cy="app-button"]').click();
    cy.url().should("eq", "http://localhost:3000/home");
  });
});

// You can create a clean, full, e2e spec file to test the flow of your application using page object methods.
