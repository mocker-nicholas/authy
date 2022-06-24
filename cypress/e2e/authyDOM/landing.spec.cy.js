// Arrange Act Assert
describe("Page Loads", () => {
  // The page loads
  it("Landing Page Renders", () => {
    cy.visit("/");
  });

  // The dom elements are all present
  it("Dom elements present", () => {
    cy.get('[data-cy="app-button"]').should("exist");
    cy.get('[data-cy="card-1"]').should("exist");
    cy.get('[data-cy="card-2"]').should("exist");
    cy.get('[data-cy="card-3"]').should("exist");
  });

  // The Link component correctly brings you to /home route
  it("Button brings you to app homepage", () => {
    cy.get('[data-cy="app-button"]').click();
    cy.url().should("eq", "http://localhost:3000/home");
  });
});

// Home page is loading and firing side effect requests
describe("Home page loads correctly and fires requests", () => {
  it("Page Renders", () => {
    cy.get('[data-cy="home-content"]').should("exist");
  });

  it("Graphs spawn in", () => {
    cy.get('[data-cy="graph-1"]').should("exist");
    cy.get('[data-cy="graph-2"]').should("exist");
  });
});

// VT Page loads in the correct state
describe("Nagivation to vt works correctly", () => {
  it("Loads virtual terminal page", () => {
    cy.get('[data-cy="vtnavlink"]').click();
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
  });
});

// Customers page renders as it should
describe("Navigation to customers works correctly", () => {
  it("Loads virtual terminal page", () => {
    cy.get('[data-cy="customernavlink"]').click();
    cy.url().should("eq", "http://localhost:3000/customer");
  });

  it("The customer create link has the correct text", () => {
    cy.get('[data-cy="customerlink"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Create");
      });
  });

  it("Customer rows contain href to customer page", () => {
    cy.get('[data-cy="detail"]').then((detail) => {
      cy.wrap(detail).each((cust) => {
        cy.wrap(cust).should("have.attr", "href").and("contain", "/customer/");
      });
    });
  });
});

// Customer create link navigates to the correct form
describe("Navigation customer create works correctly", () => {
  it("Customer create link brings us to the correct page", () => {
    cy.get('[data-cy="customerlink"]').click();
    cy.url().should("eq", "http://localhost:3000/customer/create");
  });
});

// Navigate to the reporting page
describe("Navigation to reporting works correctly", () => {
  it("Reporting nav link brings us to the correct page", () => {
    cy.get('[data-cy="reportingnavlink"]').click();
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
        cy.wait(2000);
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
});
// Every test starts with describe() or context() - those are equals
// Every test takes in a callback.
// Inside in the test, it() describes the test, and takes in callback that is the test
// You can put a decribe() within a decribe() to break things up to sections
//  - this is useful for using the beforeEach()
//  - beforeEach() will run something for each it() inside of a describe()
// Almost all tests start with cy.get("locator") - locator is basically a css selector.
// If there are no unique identifiers, you can use dom traversal .parentelement(form).find(button)
// You can chain these traversal commands
// once you call .then() on something, it becomes a jquery object, so we have to use different assertions from chai rather than cypress
// To prevent the above you can use cy.wrap() to wrap your var, and then you can use cypress assertions again
// .should('have.css', 'background-color', 'black')
