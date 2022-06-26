import { navigateTo } from "../../support/page_objects/navigationPage.js";
import { onCustomerCreatePage } from "../../support/page_objects/customerCreatePage.js";

describe("Customer create request is as expected", () => {
  it("Form request body structure works", () => {
    navigateTo.customerPage();
    cy.get(".btn-dark-orange").click();
    onCustomerCreatePage.fillFormErrors();
    onCustomerCreatePage.fillForm();
  });
});
