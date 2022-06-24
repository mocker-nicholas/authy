import { navigateTo } from "../../support/page_objects/navigationPage.js";

// Home page is loading and firing side effect requests
describe("Home page loads correctly and fires requests", () => {
  it("Page Renders", () => {
    navigateTo.homePage();
    cy.get('[data-cy="home-content"]').should("exist");
  });

  it("Graphs spawn in", () => {
    cy.get('[data-cy="graph-1"]').should("exist");
    cy.get('[data-cy="graph-2"]').should("exist");
  });
});
