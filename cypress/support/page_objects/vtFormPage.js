export class vtFormPage {
  fillForm = () => {
    cy.get('[data-cy="vtform"]').then((vtForm) => {
      const amountLabel = vtForm.find('[data-cy="amount-cy"]');
      const firstLabel = vtForm.find('[data-cy="first-cy"]');
      const lastLabel = vtForm.find('[data-cy="last-cy"]');
      const companyLabel = vtForm.find('[data-cy="company-cy"]');
      const streetLabel = vtForm.find('[data-cy="street-cy"]');
      const cityLabel = vtForm.find('[data-cy="city-cy"]');
      const stateLabel = vtForm.find('[data-cy="state-cy"]');
      const zipLabel = vtForm.find('[data-cy="zip-cy"]');
      cy.wrap(amountLabel).clear().type("15");
      cy.wrap(firstLabel).clear().type("QA");
      cy.wrap(lastLabel).clear().type("Test");
      cy.wrap(companyLabel).clear().type("Pie Company");
      cy.wrap(streetLabel).clear().type("777 168th St");
      cy.wrap(cityLabel).clear().type("Lincoln");
      cy.wrap(stateLabel).clear().type("NE");
      cy.wrap(zipLabel).clear().type("12345");
    });
  };

  fillFormErrors = () => {
    cy.get('[data-cy="vtform"]').then((vtForm) => {
      const amountLabel = vtForm.find('[data-cy="amount-cy"]');
      const firstLabel = vtForm.find('[data-cy="first-cy"]');
      const lastLabel = vtForm.find('[data-cy="last-cy"]');
      const companyLabel = vtForm.find('[data-cy="company-cy"]');
      const streetLabel = vtForm.find('[data-cy="street-cy"]');
      const cityLabel = vtForm.find('[data-cy="city-cy"]');
      const stateLabel = vtForm.find('[data-cy="state-cy"]');
      const zipLabel = vtForm.find('[data-cy="zip-cy"]');
      cy.wrap(amountLabel).clear().type("-15");
      cy.wrap(firstLabel).clear().type("QA{}");
      cy.wrap(lastLabel).clear().type("Test{}");
      cy.wrap(companyLabel).clear().type("Pie Company {}");
      cy.wrap(streetLabel).clear().type("777 168th St {}");
      cy.wrap(cityLabel).clear().type("Lincoln -!");
      cy.wrap(stateLabel).clear().type("NEB");
      cy.wrap(zipLabel).clear().type("123456");
    });
  };
}

export const onVtFormPage = new vtFormPage();
