import request from 'supertest'
import { app } from '../app'
import createConnection from '../database'
 // coisa de corno, não usa essa merda bugada pra caralho 
describe('Surveys', () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })
    
    it("Should be able to create a new survey", async () => {
        const response = await request(app).post('/surveys').send({
            title: 'Title Example',
            description: 'Description Example',
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
    })

    it("Should be able to create a new survey", async () => {
        await request(app).post('/surveys').send({
            title: 'Title Example',
            description: 'Description Example',
        })
        
    })

    it("Should be able to get all surveys", async () => {
        await request(app).get('/surveys').send({
            title: 'Title Example2',
            description: 'Description Example2',
        })
        const request = await request(app).get('/surveys')
        expect(request.body.length).toBe(2)
    })
})
