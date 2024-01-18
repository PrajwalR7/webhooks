import { Request, Response } from "express"
import { v4 as uuid } from 'uuid'
import { data, setData } from "../globals"
import { publish } from "../utils/publish"
import { logger } from "../utils/logger"

export const postHandler = async (req: Request, res: Response) => {
    const id = uuid()
    const newData = {value: req.body.data, id}
    logger.info('New data - ', newData)
    data.push(newData)
    publish('webhook.create', newData)
    res.sendStatus(200)
}

export const getHandler = (_req: Request, res: Response) => {
    res.status(200).json({
        data
    })
}

export const deleteHandler = async (req: Request, res: Response) => {
    const dataToBeDeleted = req.body.id
    setData(data.filter(item => item.id !== dataToBeDeleted.id))
    publish('webhook.delete', dataToBeDeleted)
    res.sendStatus(200)
}