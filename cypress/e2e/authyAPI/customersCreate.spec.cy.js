import { navigateTo } from "../../support/page_objects/navigationPage.js";
import { onCustomerCreatePage } from "../../support/page_objects/customerCreatePage.js";
import { chargeCustomer } from "../../../src/lib/requests.js";

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

  it("Amount input is functions", () => {
    cy.get('[data-cy="custchargeamount"]').clear().type("9.99");
  });

  it("can be deleted", () => {
    cy.get('[data-cy="custdeletebtn"]').click();
    cy.wait(1000);
    cy.url().should("eq", "http://localhost:3000/customer");
  });
});

describe("Customer charge API is functional", () => {
  const randNum = ((Math.random() * 10000) / 100).toFixed(2);
  it("QA test charge customer exists", () => {
    cy.visit("http://localhost:3000/customer/506301085");
    // You can also you a request option if you have headers for auth
    cy.request("POST", "http://localhost:8080/api/customer/506011663/charge", {
      id: "506301085",
      amount: randNum,
    })
      .its("body")
      .then((body) => {
        console.log(body.transId);
        expect(body.messages.resultCode).to.equal("Ok");
        cy.visit(
          `http://localhost:3000/reporting/${body.transactionResponse.transId}`
        );
        cy.wait(1000);
        cy.get("span")
          .first()
          .then((el) => cy.wrap(el).should("contain", `${randNum}`));
      });
  });
});
