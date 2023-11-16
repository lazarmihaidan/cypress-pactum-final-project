describe('Order products test suite', () => {
    const baseUrl = "https://automationteststore.com/";
    const loginName = "Marcos.Hyatt";
    const loginPassword = "Parola123";
    beforeEach(() => {
        cy.visit(baseUrl + '/index.php?rt=account/login');
      });
      it('Order first product from the homepage - Successful Request', () => {
        cy.get('#loginFrm_loginname').type(loginName, {delay:0});
        cy.get('#loginFrm_password').type(loginPassword, {delay:0});
        cy.get('button').contains('Login').click();
        cy.get('a[class="active menu_home"]').click();
        cy.get('#block_frame_featured_1769 > div > div:nth-child(1) > div.thumbnail > div.pricetag.jumbotron > a > i').click();
        cy.get('#main_menu_top > li:nth-child(4) > a > span').click({ force: true });
        cy.get('#checkout_btn').contains('Confirm Order').click();
        cy.wait(500);
        cy.get('#maincontainer > div > div > div > h1 > span.maintext').should('be.visible');
      });
});