const request = require('supertest')
const { password } = require('../database/config/config')
const { app } = require('../index')
const { Items } = require('../src/models')
const { response } = require('../src/routes/index.routes')


var token = null

beforeAll(async() => {
    return request(app)
        .post('/api/v1/auth/login')
        .send({
            user_name: 'admin12345',
            password: "qwety1234"
        })
        .expect('Content-Type', /json/)
        .then((response) => {
            token = response.body.data.token;
        })
})


describe('member/orders', () => {
    it('should be order successful created', async() => {
        return request(app)
            .post('/api/v1/member/orders')
            .set('Authorization', 'Bearer ' + token)
            .send({
                promo: "awad",
                customer_name: "samsol",
                sender_addres: "jl. keramat",
                receiver_addres: "jl.mansyur",
                items: (
                    ({
                        id_item: 20,
                        item_quantity: 2,
                    })
                ),
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body.message).toBe('Create order has successful')
            })
    })

})