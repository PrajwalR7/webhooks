import express, { json, urlencoded, Router } from 'express';
import { deleteHandler, getHandler, postHandler } from './handlers/serve';
import { postHandler as webhookPostHandler } from './handlers/webhook';

const app = express()
app.use(json(), urlencoded({extended: true}));
const serveRouter = Router()
const webHookRouter = Router()

serveRouter.get('/', getHandler)
serveRouter.post('/', postHandler)
serveRouter.delete('/', deleteHandler)

webHookRouter.post('*', webhookPostHandler)

app.use('/', serveRouter)
app.use('/webhook', webHookRouter)
app.listen(3000, () => {
    console.log('Publisher listening at port 3000')
})