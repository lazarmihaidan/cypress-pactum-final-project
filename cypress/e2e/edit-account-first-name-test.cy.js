import { faker } from '@faker-js/faker';

describe("Edit account details test suite", () => {
    const baseUrl = "https://automationteststore.com/";
    const loginName = "Marcos.Hyatt";
    const loginPassword = "Parola123";
    beforeEach(() => {
      cy.visit(baseUrl + '/index.php?rt=account/login');
    });
    it("Edit first name - Successful Request", () => {
        cy.get('#loginFrm_loginname').type(loginName, {delay:0});
        cy.get('#loginFrm_password').type(loginPassword, {delay:0});
        cy.get('button').contains('Login').click();
        cy.get('#maincontainer > div > div.column_right.col-md-3.col-xs-12.mt20 > div.sidewidt > div > ul > li:nth-child(3) > a').click();
        cy.get('#AccountFrm_firstname').clear();
        cy.get('#AccountFrm_firstname').type(faker.person.firstName(), {delay: 0});
        cy.get('button').contains('Continue').click();
        cy.get('#maincontainer > div > div.col-md-9.col-xs-12.mt20 > div > div.alert.alert-success').contains('Success: Your account has been successfully updated.').should('be.visible');
    });
  });