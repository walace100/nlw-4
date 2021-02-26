import {Request, Response} from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysRepository } from '../repositories/SurveysRepository'

class SurveyController {
    async create(request: Request, response: Response) {
        const { title, description } = request.body

        const surveyRepository = getCustomRepository(SurveysRepository)

        const survey = surveyRepository.create({
            title,
            description
        })

        await surveyRepository.save(survey)

        return response.status(201).json(survey)
    }

    async show(Request: Request , Response: Response) {
        const surveyRepository = getCustomRepository(SurveysRepository)

        const all = await surveyRepository.find()

        return Response.json(all)
    }
}

export { SurveyController }
