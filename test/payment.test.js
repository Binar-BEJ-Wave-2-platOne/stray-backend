const request = require('supertest')
const { app } = require('../index')
const { Items } = require('../src/models')
const { response } = require('../src/routes/index.routes')


describe('admin/payments', () => {
    it('should be payment successful created', async() => {
        return request(app)
            .post('/api/v1/admin/payments')
            .send({
                id_orders: "1",
                payment_date: "2022-08-29",
                payment_type: "cash",
                amount: "120000",
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body.message).toBe('PAID')
            })
    })

})

describe('admin/payments', () => {
    it('should be payment invalid because invalid id_orders', async() => {
        return request(app)
            .post('/api/v1/admin/payments')
            .send({
                id_orders: "100",
                payment_date: "2022-08-29",
                payment_type: "cash",
                amount: "120000",
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(404)
                expect(response.body.message).toBe('Order not exist')
            })
    })

})

describe('admin/payments', () => {
    it('should be payment invalid because paid', async() => {
        return request(app)
            .post('/api/v1/admin/payments')
            .send({
                id_orders: "100",
                payment_date: "2022-08-29",
                payment_type: "cash",
                amount: "120000",
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(400)
                expect(response.body.message).toBe('YOUR ORDERS HAVE PAID')
            })
    })

})

