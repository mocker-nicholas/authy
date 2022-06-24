import { navigateTo } from "../../support/page_objects/navigationPage.js";

// Customers page renders as it should
describe("Navigation to customers works correctly", () => {
  it("Loads virtual terminal page", () => {
    navigateTo.customerPage();
    cy.url().should("eq", "http://localhost:3000/customer");
  });

  it("The customer create link has the correct text", () => {
    cy.get('[data-cy="customerlink"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Create");
      });
  });

  it("Customer rows contain href to customer page", () => {
    cy.get('[data-cy="detail"]').then((detail) => {
      cy.wrap(detail).each((cust) => {
        cy.wrap(cust).should("have.attr", "href").and("contain", "/customer/");
      });
    });
  });
});

// Customer create link navigates to the correct form
describe("Navigation customer create works correctly", () => {
  it("Customer create link brings us to the correct page", () => {
    cy.get('[data-cy="customerlink"]').click();
    cy.url().should("eq", "http://localhost:3000/customer/create");
  });
});
