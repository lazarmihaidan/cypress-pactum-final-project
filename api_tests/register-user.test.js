const { spec, request } = require ('pactum');
const { faker } = require('@faker-js/faker');

describe('POST Create new user Test Suite', () => {
    before(() => {
        request.setDefaultTimeout(10000);
    });
    const baseUrl = "https://practice.expandtesting.com/notes/api";
    const randomName = faker.person.fullName();
    const randomEmailAddress = faker.internet.email();
    const randomPassword = faker.internet.password();
    const requestBody = {
            "name": randomName,
            "email": randomEmailAddress,
            "password": randomPassword
    };
    const invalidRequestBody ={
        "email": randomEmailAddress,
        "password": randomPassword
    };
    it('Register new user - successful request', async () => {
        await spec()
        .post(baseUrl + '/users/register')
        .withBody(requestBody)
        .expectStatus(201);
    });
    it("Register new user - Missing required key 'name'", async () => {
        await spec()
        .post(baseUrl + '/users/register')
        .withBody(invalidRequestBody)
        .expectStatus(400)
        .expectJsonLike(
            {
                "success": false,
                "status": 400,
                "message": "User name must be between 4 and 30 characters"
            }
        )

    });
});