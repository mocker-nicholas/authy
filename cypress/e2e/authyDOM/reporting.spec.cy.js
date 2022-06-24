import { navigateTo } from "../../support/page_objects/navigationPage.js";

// Navigate to the reporting page
describe("Navigation to reporting works correctly", () => {
  it("Reporting nav link brings us to the correct page", () => {
    navigateTo.reportingPage();
    cy.url().should("eq", "http://localhost:3000/reporting");
  });

  // Check the date and select inputs for the correct values and functionality
  describe("DOM elements function correctly", () => {
    // Make sure page buttons are acting ok
    it("pagination works", () => {
      cy.get('[data-cy="nextPage"]').click();
      cy.get('[data-cy="nextPage"]').should("contain", "Page 3");
      cy.get('[data-cy="prevPage"]').click();
      cy.get('[data-cy="prevPage"]').should("contain", "Page 0");
    });

    // Check the date and status val att work correctly
    it("The date picker and status select works", () => {
      cy.get('[data-cy="startDate"]').then((input) => {
        cy.wrap(input).click();
        cy.wrap(input).invoke("attr", "value", "2022-06-08").type("2022-06-08");
      });
      cy.get('[data-cy="status"]').then((input) => {
        cy.wrap(input)
          .select("settled")
          .invoke("prop", "value")
          .should("contain", "settled");
      });
    });

    describe("The search button is active after date and status are selected", () => {
      it("The button is not disabled", () => {
        cy.get('[data-cy="reportingsubmitbtn"]').should("not.be.disabled");
      });
      it("It sends request to search for transactions", () => {
        cy.get('[data-cy="reportingsubmitbtn"]').click();
        cy.wait(1500);
      });
      it("returns settled transactions", () => {
        cy.get(".green").should("exist");
        cy.get(".green").should("contain", "Settled");
      });
      it("Info Link brings you to transaction page", () => {
        cy.get("tbody")
          .contains("tr", "Grace")
          .then((row) => {
            cy.wrap(row)
              .find("i")
              .parent()
              .invoke("attr", "href")
              .then((href) => {
                const detailHref = href;
                cy.wrap(row).find("i").click();
                cy.url().should("eq", `http://localhost:3000${detailHref}`);
              });
          });
      });
    });
  });

  describe("Future transaction searches should not return any results", () => {
    // If date is far out it should not return any results
    it("Should not return transactions in the future", () => {
      cy.visit("/reporting");
      let date = new Date();
      const day = date.getDate() + 1;
      console.log(day);
      cy.get('[data-cy="startDate"]').then((input) => {
        cy.wrap(input).click();
        cy.wrap(input)
          .invoke("attr", "value", `2022-06-${day}`)
          .type(`2022-06-${day}`);
        cy.get('[data-cy="status"]').then((input) => {
          cy.wrap(input)
            .select("settled")
            .invoke("prop", "value")
            .should("contain", "settled");
        });
        cy.get('[data-cy="reportingsubmitbtn"]').click();
        cy.wait(1500);
      });
      cy.get("tbody").then((tableBody) => {
        cy.wrap(tableBody).find("tr").should("not.exist");
      });
    });
  });
});
