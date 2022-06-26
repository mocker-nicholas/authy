import { navigateTo } from "../../support/page_objects/navigationPage.js";
import { onVtFormPage } from "../../support/page_objects/vtFormPage.js";

describe("Nagivation to vt works correctly", () => {
  it("Loads virtual terminal page", () => {
    navigateTo.vtPage();
    cy.url().should("eq", "http://localhost:3000/vt");
  });

  it("loads in vt trans button, form, and submit button", () => {
    cy.get('[data-cy="generatetransbtn"]').should("be.visible");
    cy.get('[data-cy="vtform"]').should("be.visible");
    cy.get('[data-cy="vtsubmitbtn"]').should("be.visible");
  });

  it("amount field is defaulted to 0.00", () => {
    cy.get('[data-cy="amount-cy"]').should("have.value", "0.00");
  });

  it("Submit button is disabled initially", () => {
    cy.get('[data-cy="vtsubmitbtn"]').should("be.disabled");
  });

  // Check all of the input labels for the correct names
  describe("Form Input Labels and submit button text are correct", () => {
    it("Contains the correct labels", () => {
      cy.get('[data-cy="vtform"]').then((vtForm) => {
        const amountLabel = vtForm.find('[for="amount"]').text();
        const firstLabel = vtForm.find('[for="first"]').text();
        const lastLabel = vtForm.find('[for="last"]').text();
        const companyLabel = vtForm.find('[for="company"]').text();
        const streetLabel = vtForm.find('[for="street"]').text();
        const cityLabel = vtForm.find('[for="city"]').text();
        const stateLabel = vtForm.find('[for="state"]').text();
        const zipLabel = vtForm.find('[for="zip"]').text();
        const countryLabel = vtForm.find('[for="country"]').text();
        expect(amountLabel).to.equal("Amount to Bill");
        expect(firstLabel).to.equal("First Name");
        expect(lastLabel).to.equal("Last Name");
        expect(companyLabel).to.equal("Company");
        expect(streetLabel).to.equal("Street Address");
        expect(cityLabel).to.equal("City");
        expect(stateLabel).to.equal("State");
        expect(zipLabel).to.equal("Zip Code");
        expect(countryLabel).to.equal("Country");

        cy.get('[data-cy="vtsubmitbtn"]').contains("Submit");
      });
    });

    it("Submit button is disabled with errors", () => {
      onVtFormPage.fillFormErrors();
      cy.get('[data-cy="vtsubmitbtn"]').should("be.disabled");
    });

    it("Submit button is enabled with no errors", () => {
      onVtFormPage.fillForm();
      cy.get('[data-cy="vtsubmitbtn"]').should("be.enabled");
    });
  });
});
