const { spec,request } = require("pactum");
const { faker } = require('@faker-js/faker');

describe('POST Create note Test Suite', () => {
    let authToken = "";
    const emailAddress = "whatever@yopmail.com";
    const password = "Parola123";
    const baseUrl = "https://practice.expandtesting.com/notes/api";
    const postNoteBody = {
        "title": faker.lorem.word(),
        "description": faker.lorem.word(),
        "category": "Personal"
    }
    before(async () => {
        request.setDefaultTimeout(10000);

        const requestBody = {
            "email": emailAddress,
            "password": password
        };
        const response = await spec().post(baseUrl + '/users/login')
        .withBody(requestBody)
        .withHeaders('Content-Type', 'application/json')
        .expectStatus(200);
        authToken = response.body.data.token;
    });
    it('Create new note - Successful Request', async () => {
        await spec()
        .post(baseUrl + '/notes')
        .withHeaders('Content-Type', 'application/json')
        .withHeaders('x-auth-token', authToken)
        .withBody(postNoteBody)
        .expectStatus(200)
    });
});