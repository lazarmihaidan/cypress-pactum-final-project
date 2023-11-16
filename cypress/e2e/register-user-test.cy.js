import { faker } from '@faker-js/faker';

describe("User registration test suite", () => {
    const baseUrl = "https://automationteststore.com/";
    beforeEach(() => {
      cy.visit(baseUrl + '/index.php?rt=account/create');
    });
    it("Create new user - Successful Request", () => {
        cy.get('#AccountFrm_firstname').type(faker.person.firstName(), {delay:0});
        cy.get('#AccountFrm_lastname').type(faker.person.lastName(), {delay:0});
        cy.get('#AccountFrm_email').type(faker.internet.email(), {delay: 0});
        cy.get('#AccountFrm_address_1').type(faker.location.streetAddress(), {delay:0});
        cy.get('#AccountFrm_city').type(faker.location.city(), {delay:0});
        cy.get('#AccountFrm_zone_id').select(1);
        cy.get('#AccountFrm_postcode').type(faker.location.city(), {delay:0});
        cy.get('#AccountFrm_loginname').type(faker.internet.displayName(), {delay:0});
        cy.get('#AccountFrm_password').type('Parola123', {delay:0});
        cy.get('#AccountFrm_confirm').type('Parola123', {delay:0});
        cy.get('#AccountFrm_agree').click();
        cy.get('button').contains('Continue').click();
        cy.get('a[href="https://automationteststore.com/index.php?rt=account/account"]').contains('Continue').should('be.visible');
    });
  });