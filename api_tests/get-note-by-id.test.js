const { spec,request } = require("pactum");
const { faker } = require('@faker-js/faker');

describe('GET note by id Test Suite', () => {
    let authToken = "";
    let noteId = "";
    const emailAddress = "whatever@yopmail.com";
    const password = "Parola123";
    const baseUrl = "https://practice.expandtesting.com/notes/api";
    const getNoteByIdSchema = require ('../api_tests/data/response/get-note-by-id-schema-validation.json')

    before(async () => {
        request.setDefaultTimeout(10000);
        // get token
        const requestBody = {
            "email": emailAddress,
            "password": password
        };
        const responseGetToken = await spec().post(baseUrl + '/users/login')
        .withBody(requestBody)
        .withHeaders('Content-Type', 'application/json')
        .expectStatus(200);
        authToken = responseGetToken.body.data.token;
        
        //get note id
        const postNoteBody = {
            "title": faker.lorem.word(),
            "description": faker.lorem.word(),
            "category": "Personal"
        }
        const responseGetNoteId = await spec().post(baseUrl + '/notes')
        .withBody(postNoteBody)
        .withHeaders('Content-Type', 'application/json')
        .withHeaders('x-auth-token', authToken)
        noteId = responseGetNoteId.body.data.id;
    });
    it('GET note by id - Successful Request', async () => {
        await spec()
        .inspect()
        .get(baseUrl + '/notes/' + noteId)
        .withHeaders('Content-Type', 'application/json')
        .withHeaders('x-auth-token', authToken)
        .expectStatus(200)
        .expectJsonSchema(getNoteByIdSchema);
    });
});