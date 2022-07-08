import { navigateTo } from "../../support/page_objects/navigationPage.js";

// Verify the request for the weekly data occurs
describe("The homepage makes the weekly data request", () => {
  it("The week request fires", () => {
    // Set up intercepts before you navigate to page
    // easiest way to do query strings is going to be an intercept object
    // If we want to mock the response we can pass in a file from our fixtures directory with the fixture object {fixture: "fixture/path"}
    cy.intercept({ method: "POST", path: "**/week" }).as("weekData");
    cy.intercept("POST", "**/month").as("monthData");
    cy.intercept("GET", "**/unsettled/total").as("totalData");

    // Navigate to route where you expect requests
    navigateTo.homePage();

    // Wait on those request to come back
    cy.wait(["@weekData", "@monthData", "@totalData"]);

    cy.get("@weekData").should("exist");
    cy.get("@monthData").should("exist");
    cy.get("@totalData")
      .should("exist")
      .then((data) => console.log(data));

    cy.get("@weekData").then((week) => {
      expect(week.response.body).to.be.a("array");
    });

    cy.get("@monthData").then((month) => {
      expect(month.response.body).to.be.a("array");
    });

    cy.get("@totalData").then((total) => {
      expect(total.response.body.totalTrans).to.exist;
      expect(total.response.body.unsettled_total).to.exist;
    });
  });
});
