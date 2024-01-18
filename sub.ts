import express, { Request, Response, json, urlencoded } from 'express'
import { logger } from './utils/logger'

const app = express()
app.use(json(), urlencoded({extended: true}))
let data: Array<Record<string, unknown>> = []

app.post('/webhook', (req: Request, res: Response) => {
    const input = req.body
    logger.info(input)
    const type = input.type
    switch(type) {
        case 'webhook.create': {
            data.push(input.data)
            logger.info('WEBHOOK DATA -', input.data, 'ADDED')
            break
        }
        case 'webhook.delete': {
            const dataToBeDeletedID = input.data
            data = data.filter(item => item.id !== dataToBeDeletedID)
            logger.info('WEBHOOK DATA -', input.data, 'DELETED')
            break
        }
    }
    res.sendStatus(200)
})

app.listen(4000, () => {
    logger.info('Subscriber listening at port number 4000')
})