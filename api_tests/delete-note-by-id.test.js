const { spec,request } = require("pactum");
const { faker } = require('@faker-js/faker');

describe('DELETE note by id Test Suite', () => {
    let authToken = "";
    let noteId = "";
    const emailAddress = "whatever@yopmail.com";
    const password = "Parola123";
    const baseUrl = "https://practice.expandtesting.com/notes/api";

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
    it('Delete note by id - Successful Request', async () => {
        await spec()
        .delete(baseUrl + '/notes/' + noteId)
        .withHeaders('Content-Type', 'application/json')
        .withHeaders('x-auth-token', authToken)
        .withBody({
            "id": noteId
        })
        .expectStatus(200)
    });
});