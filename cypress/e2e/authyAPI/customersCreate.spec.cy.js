import { navigateTo } from "../../support/page_objects/navigationPage.js";
import { onCustomerCreatePage } from "../../support/page_objects/customerCreatePage.js";

describe("Customer create request is as expected", () => {
  it("Form request body structure works", () => {
    cy.intercept("POST", "**/create").as("createReq");

    navigateTo.customerPage();
    cy.get(".btn-dark-orange").click();
    onCustomerCreatePage.fillForm();
    cy.get('[data-cy="customercreatebtn"]').click();
    cy.wait("@createReq").then((cust) => {
      console.log(cust);
    });
  });
});
