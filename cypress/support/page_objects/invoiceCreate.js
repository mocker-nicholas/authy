export class invoiceCreatePage {
  fillForm = () => {
    cy.get('[data-cy="invoiceForm"]').then((invoiceForm) => {
      const amountInput = invoiceForm.find('[data-cy="amount"]');
      const descriptionInput = invoiceForm.find('[data-cy="description"]');
      const firstInput = invoiceForm.find('[data-cy="first"]');
      const lastInput = invoiceForm.find('[data-cy="last"]');
      const streetInput = invoiceForm.find('[data-cy="street"]');
      const cityInput = invoiceForm.find('[data-cy="city"]');
      const stateInput = invoiceForm.find('[data-cy="state"]');
      const zipInput = invoiceForm.find('[data-cy="zip"]');
      cy.wrap(amountInput).clear().type("15");
      cy.wrap(descriptionInput).clear().type("QA JOB Description");
      cy.wrap(firstInput).clear().type("QA");
      cy.wrap(lastInput).clear().type("Test");
      cy.wrap(streetInput).clear().type("777 168th St");
      cy.wrap(cityInput).clear().type("Lincoln");
      cy.wrap(stateInput).clear().type("NE");
      cy.wrap(zipInput).clear().type("12345");
    });
  };

  fillFormErrors = () => {
    cy.get('[data-cy="invoiceForm"]').then((invoiceForm) => {
      const amountInput = invoiceForm.find('[data-cy="amount"]');
      const descriptionInput = invoiceForm.find('[data-cy="description"]');
      const firstInput = invoiceForm.find('[data-cy="first"]');
      const lastInput = invoiceForm.find('[data-cy="last"]');
      const streetInput = invoiceForm.find('[data-cy="street"]');
      const cityInput = invoiceForm.find('[data-cy="city"]');
      const stateInput = invoiceForm.find('[data-cy="state"]');
      const zipInput = invoiceForm.find('[data-cy="zip"]');
      cy.wrap(amountInput).clear().type("-15");
      cy.wrap(descriptionInput).clear().type("QA JOB Description {}[]");
      cy.wrap(firstInput).clear().type("QA{}");
      cy.wrap(lastInput).clear().type("Test{}");
      cy.wrap(streetInput).clear().type("777 168th St {}");
      cy.wrap(cityInput).clear().type("Lincoln -!");
      cy.wrap(stateInput).clear().type("NEB");
      cy.wrap(zipInput).clear().type("123456");
    });
  };
}

export const onInvoiceCreatePage = new invoiceCreatePage();
