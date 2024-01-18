import express, { Request, Response, json, urlencoded } from 'express'

const app = express()
app.use(json(), urlencoded({extended: true}))
let data: Array<Record<string, unknown>> = []

app.post('/webhook', (req: Request, res: Response) => {
    console.log('DATA BEFORE - ', data)
    const input = req.body
    console.log(input)
    const type = input.type
    switch(type) {
        case 'webhook.create': {
            data.push(input.data)
            break
        }
        case 'webhook.delete': {
            const dataToBeDeletedID = input.data
            data = data.filter(item => item.id !== dataToBeDeletedID)
            break
        }
    }
    console.log('DATA AFTER -', data)
    res.sendStatus(200)
})

app.listen(4000, () => {
    console.log('Subscriber listening at port number 4000')
})