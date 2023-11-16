const { spec, request } = require ('pactum');

describe('POST User login Test Suite', () => {
    before(() => {
        request.setDefaultTimeout(10000);
    });
    const emailAddress = "whatever@yopmail.com";
    const password = "Parola123";
    const baseUrl = "https://practice.expandtesting.com/notes/api";
    const requestBody = {
        "email": emailAddress,
        "password": password
    }
    it('User login - Successful Request', async () => {
        await spec()
        .post(baseUrl + '/users/login')
        .withHeaders('Content-Type', 'application/json')
        .withBody(requestBody)
        .expectStatus(200)
        .expectBodyContains('token')
    });
});