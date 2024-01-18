import { Request, Response } from "express"
import { subscribers } from "../globals"

export const postHandler = (req: Request, res: Response) => {
    const pathName = req.path.split('/')[1]
    switch (pathName) {
        case 'register': {
            subscribers.push(req.body.url)
            break
        }
    }

    res.sendStatus(200)
}