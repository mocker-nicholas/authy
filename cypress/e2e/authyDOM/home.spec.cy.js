import { navigateTo } from "../../support/page_objects/navigationPage.js";

describe("Dom Fires API requests to get display data for charts and summary", () => {
  it("Page Renders", () => {
    // Get the data for the weekly stats
    cy.intercept(
      {
        method: "POST",
        url: "**/reporting/week",
      },
      { fixture: "previousWeekData.json" }
    ).as("weekData");

    // Get the data for the pending trans stats
    cy.intercept(
      {
        method: "GET",
        url: "**/reporting/unsettled/total",
      },
      { fixture: "pendingTotals.json" }
    ).as("pendingData");

    // Get the data for the monthly Stats
    cy.intercept(
      {
        method: "POST",
        url: "**/reporting/month",
      },
      { fixture: "monthlyStats.json" }
    ).as("monthData");

    navigateTo.homePage();

    cy.wait(["@pendingData", "@weekData", "@monthData"]);

    cy.get('[data-cy="home-content"]').should("exist");
  });

  it("Handles the weekly data correctly", () => {});
});

// Home page is loading and firing side effect requests
describe("Home page loads api response data correctly", () => {
  it("Has the total summarys", () => {
    cy.wait(1000);
    cy.get('[data-cy="total-1"]').should("contain", "Previous Week: $6000.00");
    cy.get('[data-cy="total-2"]').should("contain", "Pending Total: $1999.99");
    cy.get('[data-cy="total-3"]').should("contain", "Pending Transactions: 69");
  });

  it("Graphs spawn in", () => {
    cy.get('[data-cy="graph-1"]').should("exist");
    cy.get('[data-cy="graph-2"]').should("exist");
  });
});
