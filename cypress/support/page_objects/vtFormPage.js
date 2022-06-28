export class vtFormPage {
  fillForm = () => {
    cy.get('[data-cy="vtform"]').then((vtForm) => {
      const amountInput = vtForm.find('[data-cy="amount-cy"]');
      const firstInput = vtForm.find('[data-cy="first-cy"]');
      const lastInput = vtForm.find('[data-cy="last-cy"]');
      const companyInput = vtForm.find('[data-cy="company-cy"]');
      const streetInput = vtForm.find('[data-cy="street-cy"]');
      const cityInput = vtForm.find('[data-cy="city-cy"]');
      const stateInput = vtForm.find('[data-cy="state-cy"]');
      const zipInput = vtForm.find('[data-cy="zip-cy"]');
      cy.wrap(amountInput).clear().type("15");
      cy.wrap(firstInput).clear().type("QA");
      cy.wrap(lastInput).clear().type("Test");
      cy.wrap(companyInput).clear().type("Pie Company");
      cy.wrap(streetInput).clear().type("777 168th St");
      cy.wrap(cityInput).clear().type("Lincoln");
      cy.wrap(stateInput).clear().type("NE");
      cy.wrap(zipInput).clear().type("12345");
    });
  };

  fillFormErrors = () => {
    cy.get('[data-cy="vtform"]').then((vtForm) => {
      const amountInput = vtForm.find('[data-cy="amount-cy"]');
      const firstInput = vtForm.find('[data-cy="first-cy"]');
      const lastInput = vtForm.find('[data-cy="last-cy"]');
      const companyInput = vtForm.find('[data-cy="company-cy"]');
      const streetInput = vtForm.find('[data-cy="street-cy"]');
      const cityInput = vtForm.find('[data-cy="city-cy"]');
      const stateInput = vtForm.find('[data-cy="state-cy"]');
      const zipInput = vtForm.find('[data-cy="zip-cy"]');
      cy.wrap(amountInput).clear().type("-15");
      cy.wrap(firstInput).clear().type("QA{}");
      cy.wrap(lastInput).clear().type("Test{}");
      cy.wrap(companyInput).clear().type("Pie Company {}");
      cy.wrap(streetInput).clear().type("777 168th St {}");
      cy.wrap(cityInput).clear().type("Lincoln -!");
      cy.wrap(stateInput).clear().type("NEB");
      cy.wrap(zipInput).clear().type("123456");
    });
  };
}

export const onVtFormPage = new vtFormPage();
