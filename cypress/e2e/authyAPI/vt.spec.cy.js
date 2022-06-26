import { navigateTo } from "../../support/page_objects/navigationPage.js";
import { onVtFormPage } from "../../support/page_objects/vtFormPage.js";

describe("vt generates random transactionr request on click", () => {
  it("clicking the generate button sends request", () => {
    cy.intercept("POST", "**/generate").as("generate");

    navigateTo.vtPage();

    cy.get('[data-cy="generatetransbtn"]').click();

    cy.wait("@generate").then((trans) => {
      expect(trans).to.exist;
      if (trans.response.body.responseCode === "2") {
        cy.get('[data-cy="errormessage"]').should("exist");
      } else {
        cy.wait(1000);
        cy.url().should("contain", trans.response.body.transId);
      }
    });
  });
});

describe("Getting a hosted token causes proceed to payment menu to appear", () => {
  it("Error free request gets token and sets proceed button value to token", () => {
    cy.intercept("POST", "**/hosted").as("token");
    navigateTo.vtPage();

    onVtFormPage.fillForm();
    cy.get('[data-cy="vtsubmitbtn"]').click();
    cy.wait("@token").then((token) => {
      console.log(token);
      if (token.response.body.token) {
        cy.get('[data-cy="gottoauthbtn"]').should("exist");
        cy.get("input")
          .invoke("attr", "value")
          .then((val) => {
            cy.wrap(val).should("eq", token.response.body.token);
          });
      } else {
        console.log("/// Redirect for errors coming soon");
      }
    });
  });
});
