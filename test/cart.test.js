const request = require('supertest')
const { app } = require('../index')

var token = null

beforeAll(async () => {
    return request(app)
        .post('/api/v1/auth/login')
        .send({
            user_name: 'admin12345',
            password: 'qwerty1234',
        })
        .expect('Content-Type', /json/)
        .then((response) => {
            token = response.body.data.token;
        })
})

describe('member/cart', () => {
    it('should be cart successful created', async() => {
        return request(app)
            .post('/api/v1/member/carts')
            .set('Authorization', 'Bearer ' + token)
            .send({
                id_item: 1,
                quantity: 1
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body.message).toBe('Create cart has successful')
            })
    })

    it('should be return 200 if success get all data cart', async () => {
        return request(app)
            .get('/api/v1/member/carts')
            .set('Authorization', 'Bearer ' + token)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(200)
            })
    })
})