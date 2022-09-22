const request = require('supertest')
const { app } = require('../index')


describe('member/cart', () => {
    it('should be cart successful created', async() => {
        return request(app)
            .post('/api/v1/member/carts')
         
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
           
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(200)
            })
    })
})