import { navigateTo } from "../../support/page_objects/navigationPage.js";
import { onInvoiceCreatePage } from "../../support/page_objects/invoiceCreate.js";

describe("The request for invoices works correctly", () => {
  it("Request to get invoices is sent when the page loads", () => {
    cy.intercept("**/api/invoice").as("invoice");

    navigateTo.invoicePage();

    cy.wait("@invoice").then((data) => {
      expect(data.response.body).to.be.a("array");
    });
  });

  it("The create button takes you to the create invoice page", () => {
    cy.get('[data-cy="createbtn"]').click();
    cy.url().should("contain", "/invoice/create");
    cy.get('[data-cy="submitbtn"]').should("be.disabled");
  });
});

describe("Create invoice request body returns with proper params", () => {
  it("Works with a proper body", () => {
    cy.intercept("POST", "**/create").as("createreq");

    onInvoiceCreatePage.fillForm();
    cy.get('[data-cy="submitbtn"]').click();
    cy.wait("@createreq");
    cy.get("@createreq").then((req) => {
      expect(req.response.body.invoice_number).to.exist;
      expect(req.response.body.message).to.exist;
    });
  });

  it("Deletes the invoice when the delete button is clicked", () => {
    cy.intercept("DELETE", "**/api/invoice/**").as("deletereq");
    cy.get('[data-cy="deletebtn"]').click();

    cy.wait("@deletereq");
    cy.get("@deletereq").then((req) => {
      console.log(req.response);
      expect(req).to.exist;
    });
  });
});

describe("Create invoice request returns error when inproper response is returned", () => {
  it("shows a user the error message", () => {
    cy.get('[data-cy="invoicenavlink"]').click();
    cy.intercept("POST", "**/create", [{ error: "there was a problem" }]).as(
      "createreq"
    );

    cy.get('[data-cy="createbtn"]').click();
    onInvoiceCreatePage.fillForm();
    cy.get('[data-cy="submitbtn"]').click();
    cy.get('[data-cy="submitbtn"]').click();
    cy.wait("@createreq");
    cy.get('[data-cy="errorbox"]').should(
      "contain",
      "There was a problem creating your invoice"
    );
  });

  it("the error button keeps you on the same page", () => {
    cy.get(".btn-dark-blue").contains("Go Back").click();
    cy.url().should("eq", "http://localhost:3000/invoice/create");
  });
});
