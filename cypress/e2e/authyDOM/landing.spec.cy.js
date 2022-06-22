// Arrange Act Assert

describe("Page Loads", () => {
  // The page loads
  it("Landing Page Renders", () => {
    cy.visit("/");
  });

  // The dom elements are all present
  it("Dom elements present", () => {
    cy.get('[data-cy="app-button"]').should("exist");
    cy.get('[data-cy="card-1"]').should("exist");
    cy.get('[data-cy="card-2"]').should("exist");
    cy.get('[data-cy="card-3"]').should("exist");
  });

  // The Link component correctly brings you to /home route
  it("Button brings you to app homepage", () => {
    cy.get('[data-cy="app-button"]').click();
    cy.url().should("eq", "http://localhost:3000/home");
  });
});

// Home page is loading and firing side effect requests
describe("Home page loads correctly and fires requests", () => {
  it("Page Renders", () => {
    cy.get('[data-cy="home-content"]');
  });

  it("Graphs spawn in", () => {
    cy.get('[data-cy="graph-1"]').should("exist");
    cy.get('[data-cy="graph-2"]').should("exist");
  });
});
