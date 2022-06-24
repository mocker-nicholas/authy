export class NavigationPage {
  homePage = () => {
    cy.visit("/");
    cy.get('[data-cy="app-button"]').click();
    cy.get('[data-cy="homenavlink"]').click();
  };

  vtPage = () => {
    cy.visit("/");
    cy.get('[data-cy="app-button"]').click();
    cy.get('[data-cy="vtnavlink"]').click();
  };

  customerPage = () => {
    cy.visit("/");
    cy.get('[data-cy="app-button"]').click();
    cy.get('[data-cy="customernavlink"]').click();
  };

  reportingPage = () => {
    cy.visit("/");
    cy.get('[data-cy="app-button"]').click();
    cy.get('[data-cy="reportingnavlink"]').click();
  };

  invoicePage = () => {
    cy.visit("/");
    cy.get('[data-cy="app-button"]').click();
    cy.get('[data-cy="invoicenavlink"]').click();
  };
}

export const navigateTo = new NavigationPage();
