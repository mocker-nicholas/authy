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
