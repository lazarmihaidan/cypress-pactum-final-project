describe("Login-Logout test suite", () => {
    const baseUrl = "https://automationteststore.com/";
    const loginName = "Marcos.Hyatt";
    const loginPassword = "Parola123";
    beforeEach(() => {
      cy.visit(baseUrl + '/index.php?rt=account/login');
    });
    it("Login-Logout - Successful Request", () => {
        cy.get('#loginFrm_loginname').type(loginName, {delay:0});
        cy.get('#loginFrm_password').type(loginPassword, {delay:0});
        cy.get('button').contains('Login').click();
        cy.get('ul.side_account_list').contains('Logoff').click();
        cy.get('#maincontainer').contains('You have been logged off your account. It is now safe to leave the computer.').should('be.visible');
    });
  });