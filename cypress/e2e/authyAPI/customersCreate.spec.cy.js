import { navigateTo } from "../../support/page_objects/navigationPage.js";
import { onCustomerCreatePage } from "../../support/page_objects/customerCreatePage.js";

describe("Customer create request is as expected", () => {
  it("Form request body structure works", () => {
    cy.intercept("POST", "**/create", (req) => {
      req.body.first.value = "QA Nick Is cool QA";

      req.reply((res) => {
        expect(res.body.messages.resultCode).to.equal("Ok");
      });
    }).as("createReq");

    navigateTo.customerPage();
    cy.get('[data-cy="customerlink"]').click();
    onCustomerCreatePage.fillForm();
    cy.get('[data-cy="customercreatebtn"]').click();
    cy.wait("@createReq").then((cust) => {
      console.log(cust);
    });
  });

  it("Is able to charge new customer created via API", () => {
    navigateTo.customerPage();
    cy.get('[data-cy="customerlink"]').click();
  });
});
