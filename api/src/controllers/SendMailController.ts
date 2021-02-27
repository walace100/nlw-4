import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysRepository } from '../repositories/SurveysRepository'
import { UsersRepository } from '../repositories/UserRepository'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'

export class SendMailController {
    async execute(request: Request, response: Response) {
        const {email, survey_id } = request.body

        const usersRepository = getCustomRepository(UsersRepository)
        const surveyRepository = getCustomRepository(SurveysRepository)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const userAlreadyExists = await usersRepository.findOne({email})

        if (!userAlreadyExists) {
            return response.status(400).json({
                error: "User does not exists"
            })
        }

        const surveyAlreadyExists = await surveyRepository.findOne({id: survey_id})

        if (!surveyAlreadyExists) {
            return response.status(400).json({
                error: "Survey does not exist"
            })
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        })
        await surveyRepository.save(surveyUser)

        return response.json(surveyUser)
    }
}
