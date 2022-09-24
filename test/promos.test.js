const request = require('supertest')
const { app } = require('../index')

var token = null

beforeAll(async () => {
    return request(app)
        .post('api/v1/admin/promos')
        .send({
            user_name: 'admin1',
            password: 'qwerty123',
        })
        .expect('Content-Type', /json/)
        .then((response) => {
            token = response.body.data.token
        })
})

describe('admin/promos', () => {
    it('Should be 200 if id found', async () => {
        return request(app)
            .get('/api/v1/admin/promos')
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: ['1', '2', '3']
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(200)
                expect(response.body.message).toBe('success get all promos')
            })
    })

    it('Should be 404 if id not found', async () => {
        return request(app)
            .get('/api/v1/admin/promos')
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: ['100', '101', '102']
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(404)
                expect(response.body.message).toBe('promos not found')
            })
    })
})

describe('admin/promos', () => {
    it('should be 200 if id found', async () => {
        return request(app)
            .get('/api/v1/admin/promos')
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: '1'
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(200)
                expect(response.body.message).toBe('success get promo')
            })
    })

    it('Should be 404 if id not found', async () => {
        return request(app)
            .get('/api/v1/admin/promos')
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: '1000'
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(404)
                expect(response.body.message).toBe('promo not found')
            })
    })
})

describe('admin/promos', () => {
    it('Should be 201 if promo successful created', async() => {
        return request(app)
            .post('/api/v1/admin/promos')
            .set('Authorization', 'Bearer ' + token)
            .send({
                promo_name: 'PROMO HARI KEMERDEKAAN',
                promo_category: 'DISKON ONGKIR',
                promo_code: 'MERDEKA',
                promo_amount: '17000'
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body.message).toBe('Success create promos')
            })
    })

    it('Should be 409 if promo code is exist', async() => {
        return request(app)
            .post('/api/v1/admin/promos')
            .set('Authorization', 'Bearer ' + token)
            .send({
                promo_name: 'PROMO HARI KEMERDEKAAN',
                promo_category: 'DISKON ONGKIR',
                promo_code: 'MERDEKA',
                promo_amount: '17000'
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(409)
                expect(response.body.message).toBe('Promo code is exist')
            })
    })
})

describe('admin/promos', () => {
    it('Should be 200 if id promo is found', async() => {
        return request(app)
            .patch('api/v1/admin/promos')
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: '2',
                promo_code: 'HARIRAYA'
            })
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.status).toBe(201)
                expect(response.body.message).toBe('Update promo success')
            })
    })

    it('Should be 409 if code promo is updated to existing code', async() => {
        
    })
})