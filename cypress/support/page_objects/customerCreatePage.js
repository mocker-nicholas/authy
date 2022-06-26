import { randId } from "../../../src/lib/util";

export class customerCreatePage {
  fillForm = () => {
    cy.get('[data-cy="customercreateform"]').then((customerCreate) => {
      const descriptionInput = customerCreate.find(
        '[data-cy="description-cy"]'
      );
      const firstInput = customerCreate.find('[data-cy="first-cy"]');
      const lastInput = customerCreate.find('[data-cy="last-cy"]');
      const emailInput = customerCreate.find('[data-cy="email-cy"]');
      const companyInput = customerCreate.find('[data-cy="company-cy"]');
      const streetInput = customerCreate.find('[data-cy="street-cy"]');
      const cityInput = customerCreate.find('[data-cy="city-cy"]');
      const stateInput = customerCreate.find('[data-cy="state-cy"]');
      const zipInput = customerCreate.find('[data-cy="zip-cy"]');
      cy.wrap(descriptionInput).clear().type("QA testing description");
      cy.wrap(firstInput).clear().type("QA");
      cy.wrap(lastInput).clear().type("Test");
      cy.wrap(emailInput).clear().type(`${randId()}qaTesting@qa.com`);
      cy.wrap(companyInput).clear().type("Pie Company");
      cy.wrap(streetInput).clear().type("777 168th St");
      cy.wrap(cityInput).clear().type("Lincoln");
      cy.wrap(stateInput).clear().type("NE");
      cy.wrap(zipInput).clear().type("12345");
    });
  };

  fillFormErrors = () => {
    cy.get('[data-cy="customercreateform"]').then((customerCreate) => {
      const descriptionInput = customerCreate.find(
        '[data-cy="description-cy"]'
      );
      const firstInput = customerCreate.find('[data-cy="first-cy"]');
      const lastInput = customerCreate.find('[data-cy="last-cy"]');
      const emailInput = customerCreate.find('[data-cy="email-cy"]');
      const companyInput = customerCreate.find('[data-cy="company-cy"]');
      const streetInput = customerCreate.find('[data-cy="street-cy"]');
      const cityInput = customerCreate.find('[data-cy="city-cy"]');
      const stateInput = customerCreate.find('[data-cy="state-cy"]');
      const zipInput = customerCreate.find('[data-cy="zip-cy"]');
      cy.wrap(descriptionInput)
        .clear()
        .type("SELECT * FROM users WHERE user.id > 1");
      cy.wrap(firstInput).clear().type("QA{}");
      cy.wrap(lastInput).clear().type("Test{}");
      cy.wrap(emailInput).clear().type("-36booboo{}");
      cy.wrap(companyInput).clear().type("Pie Company {}-!");
      cy.wrap(streetInput).clear().type("777 168th St {}-!");
      cy.wrap(cityInput).clear().type("Lincoln -!");
      cy.wrap(stateInput).clear().type("NEB");
      cy.wrap(zipInput).clear().type("123456");
    });
  };
}

export const onCustomerCreatePage = new customerCreatePage();
